import React from "react";
import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineLinkedin, AiOutlineYoutube } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";

const SocialLinks = () => {
    return (
        <div className="flex justify-between items-center gap-3">
            <a
                href="https://www.facebook.com/startsmartsaudi"
                target="_blank"
                rel="nofollow noopener"
                data-magic-cursor="link-small"
            >
                <AiOutlineFacebook className="text-2xl text-primary" />
            </a>
            <a
                href="https://www.instagram.com/startsmartsaudi/"
                target="_blank"
                rel="nofollow noopener"
                data-magic-cursor="link-small"
            >
                <AiOutlineInstagram className="text-2xl text-primary" />
            </a>
            <a
                href="https://twitter.com/startsmartsaudi"
                target="_blank"
                rel="nofollow noopener"
                data-magic-cursor="link-small"
            >
                <FaXTwitter className="text-2xl text-primary" />
            </a>
            <a
                href="https://www.linkedin.com/company/startsmartsaudi"
                target="_blank"
                rel="nofollow noopener"
                data-magic-cursor="link-small"
            >
                <AiOutlineLinkedin className="text-2xl text-primary" />
            </a>
            <a
                href="https://www.youtube.com/channel/UCC_q_PoLbXjilPbqrOzjvcQ"
                target="_blank"
                rel="nofollow noopener"
                data-magic-cursor="link-small"
            >
                <AiOutlineYoutube className="text-2xl text-primary" />
            </a>
        </div>
    );
};

export default SocialLinks;
