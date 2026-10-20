import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { tokenRgb } from "./tokenColor";

/*
 * A ribbon of fine glowing wires that drifts and twists on its own.
 * Moving the pointer over the ribbon sends white pulses out from that point in both directions along the
 * wire under it, and clicking the ribbon sends a burst out from the click point across many wires; the rest
 * of the page doesn't trigger either. Original WebGL implementation
 * (no dependencies).
 *
 * Geometry is built once: every wire is a strip of quads along s ∈ [0, 1]. The vertex shader
 * bends the strips into the ribbon each frame, so the CPU only updates uniforms.
 */

const SEGMENTS = 160;
const MAX_PULSES = 48;

const VERTEX = `
precision highp float;
attribute float aS;
attribute float aWire;
attribute float aSide;

uniform vec2 uRes;
uniform float uTime;
uniform float uClock;
uniform float uWires;
uniform float uAmp;
uniform float uWaveLen;
uniform float uAngle;
uniform float uTwist;
uniform float uCurl;
uniform float uRibbonW;
uniform float uSpin;
uniform float uHalfPx;
uniform float uIntensity;
uniform float uHover;
uniform float uStripes;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec4 uPulses[${MAX_PULSES}];

varying vec3 vColor;
varying float vDist;

float centerY(float x, float ph, float k) {
  return uAmp * (0.55 * sin(k * x + ph) + uCurl * sin(2.1 * k * x - ph * 1.3 + 1.7));
}

void main() {
  float aspect = uRes.x / uRes.y;
  float halfLen = sqrt(aspect * aspect + 1.0) * 1.15;
  float x = (aS * 2.0 - 1.0) * halfLen;

  float ph = uTime * 0.35;
  float k = 1.6 / uWaveLen;
  float amp = 0.85 + 0.15 * sin(uTime * 0.3);

  float y = centerY(x, ph, k) * amp;
  float dydx = (centerY(x + 0.001, ph, k) * amp - y) / 0.001;
  vec2 n = normalize(vec2(-dydx, 1.0));

  // The ribbon turns about its centre line; where cos(theta) crosses zero the wires converge
  float wf = aWire / max(uWires - 1.0, 1.0);
  float o = (wf - 0.5) * uRibbonW;
  float theta = uTwist * x * 1.2 + uTime * uSpin * 0.6;
  float d = o * cos(theta) + 0.004 * sin(x * 9.0 + aWire * 1.7 + ph * 2.0);
  float depth = sin(theta) * (wf - 0.5) * 2.0;

  vec2 p = vec2(x, y) + n * d;

  float a = uAngle + 0.08 * sin(uTime * 0.13);
  mat2 rot = mat2(cos(a), sin(a), -sin(a), cos(a));
  vec2 pw = rot * p;
  vec2 nw = normalize(rot * n);

  vDist = aSide * uHalfPx;
  vec2 clip = vec2(pw.x / aspect, pw.y) + nw * vDist * 2.0 / uRes;
  gl_Position = vec4(clip, 0.0, 1.0);

  // Pulses: comet-shaped bright segments travelling along single wires, away from their origin.
  // q.x packs wire + origin * 0.999 (wire = floor, origin along s = fract), q.y start time,
  // q.z signed speed in lengths/second (negative runs toward s = 0), q.w comet length.
  float pulse = 0.0;
  for (int i = 0; i < ${MAX_PULSES}; i++) {
    vec4 q = uPulses[i];
    float origin = fract(q.x) / 0.999;
    float elapsed = uClock - q.y;
    float head = origin + elapsed * q.z;
    float dir = q.z < 0.0 ? -1.0 : 1.0;
    float onWire = 1.0 - step(0.5, abs(floor(q.x) - aWire));
    float live = step(0.0, elapsed) * step(-0.05, head) * (1.0 - step(1.05, head));
    float dx = (aS - head) * dir;
    float r = dx < 0.0 ? dx / (q.w * 4.0) : dx / (q.w * 0.6);
    // The tail never reaches back past the origin, so the two halves of a pair visibly split apart from it
    float fromOrigin = smoothstep(-0.004, 0.004, (aS - origin) * dir);
    pulse += onWire * live * exp(-r * r) * fromOrigin;
  }
  pulse = clamp(pulse, 0.0, 1.0);


  float stripe = 0.5 + 0.5 * sin(uStripes * 6.2832 * wf + x * 1.5 + uTime * 0.25);
  vec3 base = mix(uColorA, uColorB, stripe);
  float shade = mix(0.5, 1.0, 0.5 + 0.5 * depth);
  float bright = shade * uIntensity * (1.0 + 0.35 * uHover);
  float edge = smoothstep(0.0, 0.06, aS) * smoothstep(1.0, 0.94, aS);

  vColor = mix(base, vec3(1.0), pulse) * (bright + pulse * 3.0) * edge;
}
`;

const FRAGMENT = `
precision highp float;
uniform float uHalfPx;
uniform float uPassAlpha;
varying vec3 vColor;
varying float vDist;

void main() {
  float dist = abs(vDist);
  // Core pass: a soft gaussian line; glow passes: a wider gaussian across the strip
  float g = dist / (uHalfPx * 0.5);
  float a = exp(-g * g);
  a *= uPassAlpha;
  gl_FragColor = vec4(vColor * a, a);
}
`;

const compile = (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  gl.deleteShader(shader);
  return null;
};

const createProgram = (gl) => {
  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
  if (!vertex || !fragment) return null;
  const program = gl.createProgram();
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  return program;
};

// One strip of quads per wire; `step` keeps every nth wire (the glow passes don't need all of them)
const buildIndices = (wires, step) => {
  const indices = [];
  for (let w = 0; w < wires; w += step) {
    for (let i = 0; i < SEGMENTS; i++) {
      const b = (w * (SEGMENTS + 1) + i) * 2;
      indices.push(b, b + 1, b + 2, b + 1, b + 3, b + 2);
    }
  }
  return new Uint16Array(indices);
};

function WireRibbon({
  colorA = "ribbon-1",
  colorB = "ribbon-2",
  wires = 64,
  lineWidth = 1,
  ribbonWidth = 0.5,
  amplitude = 0.8,
  waveLength = 1.5,
  angle = 42,
  twist = 1.1,
  curl = 0.25,
  stripes = 2.2,
  speed = 0.75,
  spin = 0.35,
  glow = 0.7,
  intensity = 1,
  interactive = true,
  className = "",
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const settings = { colorA, colorB, lineWidth, ribbonWidth, amplitude, waveLength, angle, twist, curl, stripes, speed, spin, glow, intensity, interactive };
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false });
    if (!container || !canvas || !gl) return undefined;

    const program = createProgram(gl);
    if (!program) return undefined;
    gl.useProgram(program);

    // Vertex data: (s, wire, side) per vertex, two vertices per segment boundary
    const vertexCount = wires * (SEGMENTS + 1) * 2;
    const data = new Float32Array(vertexCount * 3);
    let v = 0;
    for (let w = 0; w < wires; w++) {
      for (let i = 0; i <= SEGMENTS; i++) {
        const s = i / SEGMENTS;
        data.set([s, w, -1, s, w, 1], v);
        v += 6;
      }
    }
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    ["aS", "aWire", "aSide"].forEach((name, i) => {
      const loc = gl.getAttribLocation(program, name);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 1, gl.FLOAT, false, 12, i * 4);
    });

    const passes = [
      { indices: buildIndices(wires, 8), core: 0, halfCss: 80, alpha: (s) => 0.03 * 8 * s.glow }, // wide haze
      { indices: buildIndices(wires, 1), core: 0, halfCss: 7, alpha: (s) => 0.03 * s.glow }, // tight glow; all wires so pulses glow too
      { indices: buildIndices(wires, 1), core: 1, halfCss: null, alpha: () => 0.5 }, // the wires themselves (~1px threads)
    ].map((pass) => {
      const ibo = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, pass.indices, gl.STATIC_DRAW);
      return { ...pass, ibo, count: pass.indices.length };
    });

    const uniformNames = [
      "uRes", "uTime", "uClock", "uWires", "uAmp", "uWaveLen", "uAngle", "uTwist", "uCurl", "uRibbonW", "uSpin",
      "uHalfPx", "uIntensity", "uHover", "uStripes", "uColorA", "uColorB", "uPulses", "uPassAlpha",
    ];
    const u = Object.fromEntries(uniformNames.map((name) => [name, gl.getUniformLocation(program, name)]));

    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE); // additive: overlapping wires brighten toward white

    // Reduced motion, or WebGL running on the CPU (no usable GPU: SwiftShader, llvmpipe, Microsoft Basic Render),
    // gets one still frame and no animation loop. Software-rendered frames would keep the main thread busy.
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = String(gl.getParameter(debugInfo ? debugInfo.UNMASKED_RENDERER_WEBGL : gl.RENDERER));
    const reduce = prefersReduced || /swiftshader|llvmpipe|softpipe|software|basic render/i.test(renderer);
    const colors = new Map();
    const color = (name) => {
      if (!colors.has(name)) colors.set(name, tokenRgb(name));
      return colors.get(name);
    };
    const pulses = new Float32Array(MAX_PULSES * 4);
    for (let i = 0; i < MAX_PULSES; i++) pulses[i * 4 + 1] = -1e4; // empty slots start long expired
    let nextPulse = 0;
    const state = { clock: 0, time: reduce ? 6 : 0, hover: 0, lastSpawn: 0 };
    const pointer = { x: 0, y: 0, active: false, movedAt: -1 };
    let ratio = 1;
    let raf = 0;
    let last = 0;
    let visible = true;

    // Spawns two pulses on one wire, leaving `origin` (0–1 along the ribbon) in opposite directions.
    // Packed as in the shader: (wire + origin * 0.999, start time, signed speed, length).
    const spawnPair = (wire, origin, { speed: [minSpeed, maxSpeed], length: [minLength, maxLength] }) => {
      const speed = minSpeed + Math.random() * (maxSpeed - minSpeed);
      const length = minLength + Math.random() * (maxLength - minLength);
      const packed = Math.min(Math.max(Math.round(wire), 0), wires - 1) + Math.min(Math.max(origin, 0), 1) * 0.999;
      [speed, -speed].forEach((signed) => {
        pulses.set([packed, state.clock, signed, length], nextPulse * 4);
        nextPulse = (nextPulse + 1) % MAX_PULSES;
      });
    };
    const HOVER_PULSE = { speed: [0.28, 0.53], length: [0.012, 0.022] };
    const CLICK_PULSE = { speed: [0.5, 0.8], length: [0.02, 0.035] };
    const CLICK_PAIRS = 14;

    const render = () => {
      const s = settingsRef.current;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform2f(u.uRes, canvas.width, canvas.height);
      gl.uniform1f(u.uTime, state.time);
      gl.uniform1f(u.uClock, state.clock);
      gl.uniform1f(u.uWires, wires);
      gl.uniform1f(u.uAmp, s.amplitude);
      gl.uniform1f(u.uWaveLen, Math.max(0.1, s.waveLength));
      gl.uniform1f(u.uAngle, (s.angle * Math.PI) / 180);
      gl.uniform1f(u.uTwist, s.twist);
      gl.uniform1f(u.uCurl, s.curl);
      gl.uniform1f(u.uRibbonW, s.ribbonWidth);
      gl.uniform1f(u.uSpin, s.spin);
      gl.uniform1f(u.uIntensity, s.intensity);
      gl.uniform1f(u.uHover, state.hover);
      gl.uniform1f(u.uStripes, s.stripes);
      gl.uniform3fv(u.uColorA, color(s.colorA));
      gl.uniform3fv(u.uColorB, color(s.colorB));
      gl.uniform4fv(u.uPulses, pulses);

      passes.forEach((pass) => {
        const halfPx = pass.core ? s.lineWidth * ratio + 1 : pass.halfCss * ratio;
        gl.uniform1f(u.uHalfPx, halfPx);
        gl.uniform1f(u.uPassAlpha, pass.alpha(s));
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pass.ibo);
        gl.drawElements(gl.TRIANGLES, pass.count, gl.UNSIGNED_SHORT, 0);
      });
    };

    const frame = (now) => {
      raf = 0;
      if (!visible || document.hidden || reduce) return;
      const s = settingsRef.current;
      const dt = last ? Math.min(Math.max((now - last) / 1000, 0.0005), 0.05) : 1 / 60;
      last = now;
      state.clock += dt;
      state.time += dt * s.speed;

      // The ribbon moves under a still pointer, so the hit test runs every frame
      const hit = s.interactive && pointer.active ? hitTest(pointer.x, pointer.y) : null;
      const engaged = hit && state.clock - pointer.movedAt < 0.25;
      state.hover += ((hit ? 1 : 0) - state.hover) * (1 - Math.exp(-dt / 0.4));
      if (engaged && state.clock - state.lastSpawn > 0.2) {
        spawnPair(hit.wire + Math.round((Math.random() - 0.5) * 2), hit.s, HOVER_PULSE);
        state.lastSpawn = state.clock;
      }

      render();
      raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      if (!raf && visible && !document.hidden && !reduce) raf = requestAnimationFrame(frame);
    };

    const resize = () => {
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(container.clientWidth * ratio));
      canvas.height = Math.max(1, Math.round(container.clientHeight * ratio));
      render();
      wake();
    };

    // Mirrors the vertex shader's centre line (without the sub-pixel wire jitter): undo the rotation, then
    // compare the pointer's distance from the curve with the ribbon's current half-width at that point.
    // The half-width shrinks to zero at a knot, so a small tolerance keeps thin parts hoverable.
    // Returns null off the ribbon, or { s, wire }: the position along the ribbon and the wire under the pointer.
    const HIT_TOLERANCE_PX = 16;
    const hitTest = (clientX, clientY) => {
      const rect = container.getBoundingClientRect();
      if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) return null;
      const s = settingsRef.current;
      const t = state.time;
      const aspect = rect.width / rect.height;
      const wx = (((clientX - rect.left) / rect.width) * 2 - 1) * aspect;
      const wy = 1 - ((clientY - rect.top) / rect.height) * 2;

      const a = (s.angle * Math.PI) / 180 + 0.08 * Math.sin(t * 0.13);
      const x = Math.cos(a) * wx + Math.sin(a) * wy;
      const y = -Math.sin(a) * wx + Math.cos(a) * wy;

      const ph = t * 0.35;
      const k = 1.6 / Math.max(0.1, s.waveLength);
      const amp = 0.85 + 0.15 * Math.sin(t * 0.3);
      const centerY = (cx) => s.amplitude * (0.55 * Math.sin(k * cx + ph) + s.curl * Math.sin(2.1 * k * cx - ph * 1.3 + 1.7)) * amp;
      const yc = centerY(x);
      const slope = (centerY(x + 0.001) - yc) / 0.001;
      const offset = (y - yc) / Math.sqrt(1 + slope * slope);

      const theta = s.twist * x * 1.2 + t * s.spin * 0.6;
      const cos = Math.cos(theta);
      const halfWidth = (s.ribbonWidth / 2) * Math.abs(cos);
      if (Math.abs(offset) > halfWidth + HIT_TOLERANCE_PX / (rect.height / 2)) return null;

      const halfLen = Math.sqrt(aspect * aspect + 1) * 1.15;
      // Near a knot every wire passes through the same spot, so any wire is a fair pick
      const across = Math.abs(cos) > 0.15 ? offset / (cos * s.ribbonWidth) + 0.5 : Math.random();
      return { s: (x / halfLen + 1) / 2, wire: Math.min(Math.max(across, 0), 1) * (wires - 1) };
    };

    const onPointerMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      pointer.movedAt = state.clock;
    };

    const onPointerDown = (event) => {
      const hit = settingsRef.current.interactive ? hitTest(event.clientX, event.clientY) : null;
      if (!hit) return;
      // A burst across many wires, all leaving the clicked point along the ribbon
      for (let i = 0; i < CLICK_PAIRS; i++) spawnPair(Math.random() * (wires - 1), hit.s + (Math.random() - 0.5) * 0.01, CLICK_PULSE);
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const onVisibility = () => {
      last = 0;
      wake();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    const intersection = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      if (visible) {
        last = 0;
        wake();
      }
    });
    intersection.observe(container);
    if (!reduce) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerdown", onPointerDown, { passive: true });
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
    }
    document.addEventListener("visibilitychange", onVisibility);
    resize();

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersection.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      passes.forEach((pass) => gl.deleteBuffer(pass.ibo));
      gl.deleteBuffer(vbo);
      gl.deleteProgram(program);
      // No loseContext(): StrictMode remounts on the same <canvas>, and a lost context cannot be reacquired
    };
  }, [wires]);

  return (
    <div ref={containerRef} className={`relative h-full w-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 block h-full w-full" />
    </div>
  );
}

WireRibbon.propTypes = {
  colorA: PropTypes.string,
  colorB: PropTypes.string,
  wires: PropTypes.number,
  lineWidth: PropTypes.number,
  ribbonWidth: PropTypes.number,
  amplitude: PropTypes.number,
  waveLength: PropTypes.number,
  angle: PropTypes.number,
  twist: PropTypes.number,
  curl: PropTypes.number,
  stripes: PropTypes.number,
  speed: PropTypes.number,
  spin: PropTypes.number,
  glow: PropTypes.number,
  intensity: PropTypes.number,
  interactive: PropTypes.bool,
  className: PropTypes.string,
};

export default WireRibbon;
