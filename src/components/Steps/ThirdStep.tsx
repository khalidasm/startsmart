import React from "react";
import { motion } from "framer-motion";
import Button from "../global components/Button";
import { ButtonTypes, ButtonVariants } from "../../constants/constants";
import { useTranslation } from 'react-i18next';
import useLanguage, { LANGUAGE_OPTIONS } from "../../useLanguage";

interface ThirdStepProps {
    reset: () => void;
}

const ThirdStep: React.FC<ThirdStepProps> = ({reset}) => {
    const { t } = useTranslation();
    const { language } = useLanguage();
    const isRTL = language === LANGUAGE_OPTIONS.ARABIC;

    return (
        <motion.div
            className={`h-screen w-screen flex items-center justify-center gradient ${isRTL ? 'rtl' : 'ltr'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        >
            <div className="flex justify-center items-center text-primary text-lg w-[600px] flex-col gap-10 border-2 border-secondary rounded-2xl py-20 px-10">
                <h1 className="font-cairo text-[25px] font-bold text-secondary text-center">
                    {t('thirdStep.registrationSuccess')}
                </h1>
                <Button
                    type={ButtonTypes.BUTTON}
                    variant={ButtonVariants.PRIMARY}
                    label={t('thirdStep.returnToWebsite')}
                    onClick={reset}
                />
            </div>
        </motion.div>
    );
};

export default ThirdStep;