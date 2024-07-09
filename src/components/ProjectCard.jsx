import React from 'react';

const CardContainer = ({ children, className, containerClassName }) => {
  const containerRef = React.useRef(null);
  const [isMouseEntered, setIsMouseEntered] = React.useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleMouseEnter = () => {
    setIsMouseEntered(true);
  };

  const handleMouseLeave = () => {
    setIsMouseEntered(false);
    if (containerRef.current) {
      containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    }
  };

  return (
    <div
      className={`flex items-center justify-center ${containerClassName}`}
      style={{ perspective: '1000px' }}
    >
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`flex items-center justify-center relative transition-all border border-white/[0.3] rounded-xl duration-200 ease-linear ${className}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </div>
    </div>
  );
};

const CardBody = ({ children, className }) => {
  return (
    <div className={`h-auto md:h-[32rem] w-96 [transform-style:preserve-3d] ${className}`}>
      {children}
    </div>
  );
};

const CardItem = ({ as: Tag = 'div', children, className, translateX = 0, translateY = 0, translateZ = 0, rotateX = 0, rotateY = 0, rotateZ = 0, ...rest }) => {
  const ref = React.useRef(null);
  const [isMouseEntered, setIsMouseEntered] = React.useState(false);

  React.useEffect(() => {
    handleAnimations();
  }, [isMouseEntered]);

  const handleAnimations = () => {
    if (!ref.current) return;
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    }
  };

  return (
    <Tag
      ref={ref}
      className={`w-fit transition duration-200 ease-linear ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
};

const ProjectCard = ({ title, description, thumbnail, githubLink, demoLink }) => {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-[#021129] relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] border-black/[0.1] w-auto sm:w-[26rem]  h-auto md:[32rem] rounded-xl p-6 pb-12 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-white"
        >
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-[#bfc1c3] text-sm max-w-sm mt-2"
        >
          {description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src={thumbnail}
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className={`flex ${demoLink ? 'justify-between' : 'justify-end'} items-center mt-8`}>
          {demoLink && (
            <a
            href={demoLink}
            target='_blank'
            className="px-4 py-2 rounded-xl text-xs font-normal text-white cursor-pointer bg-transparent transition-colors duration-200 hover:bg-gray-800"
          >
            Try now →
          </a>
          )}
          <button
            onClick={() => {
              window.open(githubLink, '_blank');
            }}
            className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold cursor-pointer transition-colors duration-200 hover:bg-gray-200"
          >
            GitHub
          </button>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default ProjectCard;