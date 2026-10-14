import { AiOutlineMail } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { CONTACT, SOCIAL_LINKS } from "../data";

const Contact = () => {
  return (
    <div className="border-b border-neutral-900 pb-24">
      <h2 className="mt-20 mb-12 text-center text-3xl md:text-4xl font-bold">Let&apos;s Connect</h2>
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
                    href={`mailto:${CONTACT.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400"
                  >
                    {CONTACT.email}
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
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400"
                  >
                    @{CONTACT.linkedinHandle}
                  </a>
                </div>
              </li>
              <li className="mt-6 flex items-center gap-3">
                <div>
                  <ImLocation size="1.5rem" />
                </div>
                <div>
                  <span className="font-semibold">Address:</span>{" "}
                  {CONTACT.location}
                </div>
              </li>
            </ul>
          </div>
      </div>
    </div>
  );
};

export default Contact;
