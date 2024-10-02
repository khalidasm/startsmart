import React from "react";
import { motion } from "framer-motion";
import { CalendarDaysIcon, ClockIcon, PenIcon, UserRoundPen } from "lucide-react";
import Button from "./global components/Button";
import { ButtonTypes, ButtonVariants } from "../constants/constants";
import { WorkshopType } from "../typescript/types";
import { useTranslation } from 'react-i18next';
import useLanguage, { LANGUAGE_OPTIONS } from "../useLanguage";

interface WorkshopListProps {
    workshops: WorkshopType[];
    selectedTab: number;
    formik: any;
    handleDetails: (workshop: WorkshopType) => void;
}

const WorkshopList: React.FC<WorkshopListProps> = ({
    workshops,
    selectedTab,
    formik,
    handleDetails,
}) => {
    const { t } = useTranslation();
    const { language } = useLanguage();
    const isRTL = language === LANGUAGE_OPTIONS.ARABIC;

    if (selectedTab === 1) return null;
    return (
        <div className="w-full" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
            <ul className="flex flex-col gap-5 py-5">
                {selectedTab === 0 &&
                    workshops.map((workshop) => (
                        <WorkshopItem
                            key={workshop.id}
                            workshop={workshop}
                            formik={formik}
                            handleDetails={handleDetails}
                            fieldName="workshops"
                            isRTL={isRTL}
                        />
                    ))}
                {selectedTab === 2 && (
                    <motion.div
                        className="flex flex-col justify-center gap-5 font-cairo"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <span className="text-secondary font-cairo">
                            {t('workshopList.investmentSessionsInfo')}
                            <a
                                href="https://falakangels.com/en/StartupInvestmentForum2024"
                                target="_blank"
                                rel="noreferrer"
                                className="text-black font-bold"
                            >
                                {" "}
                                {t('workshopList.clickHere')}
                            </a>
                        </span>
                    </motion.div>
                )}
            </ul>
        </div>
    );
};

interface WorkshopItemProps {
    workshop: WorkshopType;
    formik: any;
    handleDetails: (workshop: WorkshopType) => void;
    fieldName: string;
    isRTL: boolean;
}

const WorkshopItem: React.FC<WorkshopItemProps> = ({
    workshop,
    formik,
    handleDetails,
    fieldName,
    isRTL,
}) => {
    const { t } = useTranslation();

    return (
        <motion.li
            className="flex flex-col justify-center gap-5 font-cairo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        >
            <div className={`flex items-center gap-2`}>
                {fieldName !== "investments" && (
                    <div className="relative inline-block" 
                    style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                    >
                        <input
                            type="checkbox"
                            id={workshop.id.toString()}
                            name={workshop.title}
                            value={workshop.id}
                            checked={formik.values[fieldName].includes(
                                workshop.id
                            )}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    formik.setFieldValue(fieldName, [
                                        ...formik.values[fieldName],
                                        workshop.id,
                                    ]);
                                } else {
                                    formik.setFieldValue(
                                        fieldName,
                                        formik.values[fieldName].filter(
                                            (id: number) => id !== workshop.id
                                        )
                                    );
                                }
                            }}
                            className="appearance-none w-6 h-6 border-2 border-gray-300 rounded-md cursor-pointer transition-colors duration-200 ease-in-out checked:bg-primary checked::border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:checked:bg-primary hover:checked:bg-primary active:bg-primary"
                        />
                    </div>
                )}
                <h1 className="text-black font-bold text-lg font-cairo">
                    {isRTL ? workshop.title : workshop.title_en}
                </h1>
            </div>
            <div className={`flex items-center justify-between`}
            style={{ direction: isRTL ? 'rtl' : 'ltr' }}
            >
            <div className="flex flex-col gap-5">
                <div className="flex items-center gap-2">
                        <PenIcon className="w-6 h-6 text-primary" />
                        <p className="text-black">
                            <span className="font-bold">
                                {t("workshopList.workshopNumber")}:
                            </span>{" "}
                            {workshop.zone_number}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <UserRoundPen className="w-6 h-6 text-primary" />
                        <p className="text-black">
                            <span className="font-bold">
                                {t("workshopList.instructor")}:
                            </span>{" "}
                            {isRTL ? workshop.instructor.name : workshop.instructor.name_en}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <CalendarDaysIcon className="w-6 h-6 text-primary" />
                        <p className="text-black">
                            <span className="font-bold">
                                {t("workshopList.workshopDate")}:
                            </span>{" "}
                            {isRTL ? workshop.date : workshop.date_en}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <ClockIcon className="w-6 h-6 text-primary" />
                        <p className="text-black">
                            <span className="font-bold">
                                {t("workshopList.WorkshopDuration")}:
                            </span>{" "}
                            {isRTL ? workshop.period : workshop.period_en}
                        </p>
                    </div>
                </div>
                {/* <div className="flex flex-col gap-5">
                    <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <PencilLineIcon className="w-6 h-6 text-primary" />
                        <p className="text-black">{workshop.category2}</p>
                    </div>
                    <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <UserRoundPen className="w-6 h-6 text-primary" />
                        <p className="text-black">{workshop.mentor}</p>
                    </div>
                    <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <CalendarDaysIcon className="w-6 h-6 text-primary" />
                        <p className="text-black">
                            {workshop.date} - {workshop.time}
                        </p>
                    </div>
                </div> */}
                <div className="flex flex-col gap-2">
                    <Button
                        type={ButtonTypes.BUTTON}
                        variant={ButtonVariants.PRIMARY}
                        label={t('workshopList.details')}
                        onClick={() => handleDetails(workshop)}
                    />
                </div>
            </div>
            <div className="w-full h-[1px] gradient3" />
        </motion.li>
    );
};

export default WorkshopList;