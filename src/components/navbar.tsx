import React from 'react';
import { Globe } from "lucide-react";
import useLanguage, { LANGUAGE_OPTIONS } from "../useLanguage";

const Navbar = () => {
    const { language, changeLanguage } = useLanguage();

    return (
        <nav className={`px-3 shadow-md bg-white flex top-0 sm:p-2 md:py-2 md:px-4 w-full justify-between items-center z-10 ${language === LANGUAGE_OPTIONS.ARABIC ? 'flex-row-reverse' : ''}`}>
            <img
                src="https://dcctxbum7ka52.cloudfront.net/wp-content/uploads/2023/11/StartSmart-Eng-logo.png"
                alt="StartSmart Logo"
                className="h-20"
            />
            <button
                onClick={() => changeLanguage(
                    language === LANGUAGE_OPTIONS.ARABIC
                        ? LANGUAGE_OPTIONS.ENGLISH
                        : LANGUAGE_OPTIONS.ARABIC
                )}
                className={`font-cairo flex items-center gap-2 gradient3 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out ${language === LANGUAGE_OPTIONS.ARABIC  ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
                <Globe size={20} />
                <span>{
                  language === LANGUAGE_OPTIONS.ARABIC ? 'English' : 'العربية'
                  }</span>
            </button>
        </nav>
    );
};

export default Navbar;