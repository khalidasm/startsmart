import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BriefcaseIcon, CalendarIcon, ClockIcon, UserPenIcon } from "lucide-react";
import { WorkshopType } from "../typescript/types";
import { useTranslation } from 'react-i18next';
import useLanguage, { LANGUAGE_OPTIONS } from "../useLanguage";

interface DetailsProps {
    item: WorkshopType | null;
    isOpen: boolean;
    onClose: () => void;
}

const Details: React.FC<DetailsProps> = ({ item, isOpen, onClose }) => {
    const { t } = useTranslation();
    const { language } = useLanguage();
    const isRTL = language === LANGUAGE_OPTIONS.ARABIC;

    if (!item) return null;

    const isWorkshop = "mentor" in item;

    const renderBulletPoints = (text: string) => {
        const points = text.split("$").filter((point) => point.trim() !== "");
        return (
            <ul className={`mx-2 list-disc font-cairo ${isRTL ? 'pr-4' : 'pl-4'}`}>
                {points.map((point, index) => (
                    <li key={index} className="text-black font-cairo">
                        {point.trim()}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className={`bg-white rounded-lg shadow-xl p-6 w-full max-w-md max-h-[95%] overflow-y-auto ${isRTL ? 'rtl' : 'ltr'}`}
                        style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                    >
                        <div className="flex flex-col gap-2 mb-4">
                            <motion.button
                                onClick={onClose}
                                className={`text-gray-500 hover:text-gray-700 transition-colors ${isRTL ? 'self-start' : 'self-end'}`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </motion.button>
                            <motion.h1
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1, duration: 0.15 }}
                                className="text-lg font-bold text-black font-cairo"
                            >
                                {isRTL ? item.title : item.title_en}
                            </motion.h1>
                        </div>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.15 }}
                            className="grid grid-cols-1 md:grid-cols-1 gap-5"
                        >
                            <img
                                src={item.instructor.photo}
                                alt={isRTL ? item.instructor.name : item.instructor.name_en}
                                className="w-full h-fit rounded-lg md:col-span-1"
                            />
                            <p className="text-black flex items-center gap-1 font-cairo">
                                <UserPenIcon
                                    size={16}
                                    className="inline-block text-primary"
                                />
                                <span className="font-bold">
                                    {t('details.instructor')}:
                                </span>
                                {isRTL ? item.instructor.name : item.instructor.name_en}
                            </p>
                            <p className="text-black flex items-center gap-1 font-cairo">
                                <BriefcaseIcon
                                    size={16}
                                    className="inline-block text-primary"
                                />
                                <span className="font-bold">
                                    {t('details.jobDescription')}:
                                </span>
                                {isRTL ? item.instructor.title || t('details.notSpecified') : item.instructor.title_en || t('details.notSpecified')}
                            </p>
                            <p className="text-black flex items-center gap-1 font-cairo">
                                <CalendarIcon
                                    size={16}
                                    className="inline-block text-primary"
                                />
                                <span className="font-bold">{t('details.date')}:</span>{" "}
                                {isWorkshop && isRTL
                                    ? item.date || t('details.notSpecified')
                                    : isWorkshop && item.date_en || t('details.notSpecified')}
                            </p>
                            <p className="text-black flex items-center gap-1 font-cairo">
                                <ClockIcon
                                    size={16}
                                    className="inline-block text-primary"
                                />
                                <span className="font-bold">
                                    {isWorkshop ? t('details.time') : t('details.duration')}:
                                </span>{" "}
                                {isWorkshop && isRTL
                                    ? item.period || t('details.notSpecified')
                                    : isWorkshop && item.period_en || t('details.notSpecified')}
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.15 }}
                            className="mt-6"
                        >
                            <div className="flex items-start flex-col gap-1 font-cairo">
                                <h3 className="font-bold text-black mb-2">
                                    {t('details.aboutInstructor')}:
                                </h3>
                                <p className="font-cairo text-black">
                                    {
                                        isRTL
                                            ? item.instructor.brief
                                            : item.instructor.brief_en
                                    }
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.15 }}
                            className="mt-6"
                        >
                            <div className="flex items-start flex-col gap-2 font-cairo">
                                <h3 className="font-bold text-black mb-2">
                                    {t('details.aboutWorkshop')}:
                                </h3>
                                <div className="font-cairo font-lg leading-[35px]">
                                    {renderBulletPoints(isRTL ? item.brief : item.brief_en)}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Details;