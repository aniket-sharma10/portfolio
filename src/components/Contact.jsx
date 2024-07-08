import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { ImLocation } from "react-icons/im";

const Contact = () => {
  return (
    <div className="border-b border-neutral-900 pb-24">
      <h2 className="mt-20 mb-12 text-center text-3xl md:text-4xl font-bold">Let's Connect</h2>
      <div className="flex justify-center">
        <div className="text-lg">
            <ul>
              <li className="mt-6 flex items-center gap-3">
                <div>
                  <AiOutlineMail size="1.5rem" />
                </div>
                <div>
                  <span className="font-semibold">Email:</span>{" "}
                  <a
                    href="mailto:sharmaaniket094@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400"
                  >
                    sharmaaniket094@gmail.com
                  </a>
                </div>
              </li>
              <li className="mt-6 flex items-center gap-3">
                <div>
                  <FaSquareXTwitter size="1.5rem" />
                </div>
                <div>
                  <span className="font-semibold">DM on Twitter:</span>{" "}
                  <a
                    href="https://x.com/aniket_sharmaa_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400"
                  >
                    @aniket_sharmaa_
                  </a>
                </div>
              </li>
              <li className="mt-6 flex items-center gap-3">
                <div>
                  <FaLinkedin size="1.5rem" />
                </div>
                <div>
                  <span className="font-semibold">DM on LinkedIn:</span>{" "}
                  <a
                    href="https://linkedin.com/in/aniket-sharmaa10"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400"
                  >
                    @aniket-sharmaa10
                  </a>
                </div>
              </li>
              <li className="mt-6 flex items-center gap-3">
                <div>
                  <FaInstagram size="1.5rem" />
                </div>
                <div>
                  <span className="font-semibold">DM on Instagram:</span>{" "}
                  <a
                    href="https://www.instagram.com/aniket.priv/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400"
                  >
                    @aniket.priv
                  </a>
                </div>
              </li>
              <li className="mt-6 flex items-center gap-3">
                <div>
                  <ImLocation size="1.5rem" />
                </div>
                <div>
                  <span className="font-semibold">Address:</span>{" "}
                  Delhi, India
                </div>
              </li>
            </ul>
          </div>
      </div>
    </div>
  );
};

export default Contact;
