import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    CalendarDaysIcon,
    ClockIcon,
    ChevronDownIcon,
    PenIcon,
    ClipboardListIcon,
} from "lucide-react";
import { ButtonTypes, ButtonVariants } from "../constants/constants";
import { Consultation, Slot } from "../typescript/types";
import Button from "./global components/Button";
import { useTranslation } from "react-i18next";
import useLanguage, { LANGUAGE_OPTIONS } from "../useLanguage";

interface ConsultationListProps {
    consultations: Consultation[];
    formik: any;
}

const ConsultationList: React.FC<ConsultationListProps> = ({
    consultations,
    formik,
}) => {
    const [selectedSlots, setSelectedSlots] = useState<{
        [key: number]: number;
    }>({});
    const { language } = useLanguage();
    const isRTL = language === LANGUAGE_OPTIONS.ARABIC;

    const handleSlotSelection = (consultationId: number, slotId: number) => {
        
        setSelectedSlots((prev) => {
            const newSelectedSlots = { ...prev };
            if (newSelectedSlots[consultationId] === slotId) {
                newSelectedSlots[consultationId] = null;
            } else {
                newSelectedSlots[consultationId] = slotId;
            }
            return newSelectedSlots;
        });

        if (formik.values.consultancyslots.includes(slotId)) {
            formik.setFieldValue(
                "consultancyslots",
                formik.values.consultancyslots.filter(
                    (id: number) => id !== slotId
                )
            );
        } else {
            formik.setFieldValue("consultancyslots", [
                ...formik.values.consultancyslots,
                slotId,
            ]);
        }
    };


    useEffect(() => {
        if (formik.values.consultancyslots.length > 0) {
            setSelectedSlots((prev) => {
                const newSelectedSlots = { ...prev };
                consultations.map((consultation) => {
                    consultation.slots.map((slot) => {
                        if (formik.values.consultancyslots.includes(slot.id)) {
                            newSelectedSlots[consultation.id] = slot.id;
                        }
                    });
                });
                return newSelectedSlots;
            });
        }
    }, []);

    return (
        <div className="w-full">
            <ul className="flex flex-col gap-5 py-5">
                {consultations.map((consultation) => (
                    <ConsultationItem
                        key={consultation.id}
                        consultation={consultation}
                        onSlotSelect={handleSlotSelection}
                        selectedSlotId={selectedSlots[consultation.id]}
                        selectedSlots={selectedSlots}
                        isRTL={isRTL}
                        formik={formik}
                    />
                ))}
            </ul>
        </div>
    );
};

interface ConsultationItemProps {
    consultation: Consultation;
    onSlotSelect: (consultationId: number, slotId: number) => void;
    selectedSlotId: number | undefined;
    selectedSlots: { [key: number]: number };
    isRTL: boolean;
    formik: any;
}

const ConsultationItem: React.FC<ConsultationItemProps> = ({
    consultation,
    onSlotSelect,
    selectedSlotId,
    selectedSlots,
    isRTL,
    formik,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { t } = useTranslation();
    const ref = useRef(null);
    

    useEffect(() => {
        if(
            ref.current && !isExpanded && selectedSlots[consultation.id] !== undefined
        ){
            setIsExpanded(true)
        }
    
    }, [ref , selectedSlots]);


    console.log(selectedSlots[consultation.id])

    return (
        <motion.li
            className={`flex flex-col justify-center gap-5 font-cairo ${
                isRTL ? "rtl" : "ltr"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                direction: isRTL ? "rtl" : "ltr",
            }}
            ref={ref}
        >
            <div className="flex items-center gap-2">
                <h1 className="text-black font-bold text-2xl font-cairo">
                    {isRTL ? consultation.title : consultation.title_en}
                </h1>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-2">
                        <PenIcon className="w-6 h-6 text-primary" />
                        <p className="text-black">
                            <span className="font-bold">
                                {t("consultationList.workshopField")}:
                            </span>{" "}
                            {isRTL ? consultation.type : consultation.type_en}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <ClipboardListIcon className="w-6 h-6 text-primary" />
                        <p className="text-black">
                            <span className="font-bold">
                                {t("consultationList.workshopTopic")}:
                            </span>{" "}
                            {isRTL ? consultation.title : consultation.title_en}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <ClockIcon className="w-6 h-6 text-primary" />
                        <p className="text-black">
                            <span className="font-bold">
                                {t("consultationList.workshopDuration")}:
                            </span>{" "}
                            {isRTL
                                ? consultation.period
                                : consultation.period_en}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <CalendarDaysIcon className="w-6 h-6 text-primary" />
                        <p className="text-black">
                            <span className="font-bold">
                                {t("consultationList.workshopDate")}:
                            </span>{" "}
                            {consultation.date}
                        </p>
                    </div>
                </div>
            </div>
            <div
                className="mt-4 flex items-center justify-between cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-2">
                    <CalendarDaysIcon className="w-6 h-6 text-primary" />
                    <p className="text-black font-bold font-cairo text-lg">
                        {t("consultationList.availableTimes")}
                    </p>
                </div>
                <ChevronDownIcon
                    size={24}
                    className={`transform transition-transform duration-300 text-black ${
                        isExpanded ? "rotate-180" : ""
                    }`}
                />
            </div>
            <motion.div
                initial={false}
                animate={{
                    height: isExpanded ? "auto" : 0,
                    opacity: isExpanded ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                <AnimatePresence>
                    {isExpanded && (
                        <div className="mt-4">
                            <div
                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 py-2"
                                style={{
                                    direction: isRTL ? "rtl" : "ltr",
                                }}
                            >
                                {consultation.slots.map((slot, index) => {
                                    
                                    const isAnotherSlotSelected = () => {
                                        if(selectedSlots[consultation.id]){
                                            if(selectedSlots[consultation.id] !== slot.id){
                                                return selectedSlots[consultation.id] !== null
                                            }
                                        }else{
                                            false
                                        }
                                    }
                                    return(
                                    <SlotItem
                                        key={slot.id}
                                        slot={slot}
                                        onSelect={() =>
                                            onSlotSelect(
                                                consultation.id,
                                                slot.id
                                            )
                                        }
                                        isSelected={
                                            selectedSlotId === slot.id &&
                                            formik.values.consultancyslots.includes(
                                                slot.id
                                            )
                                        }
                                        isDisabled={slot.is_reserved || isAnotherSlotSelected()}
                                        index={index}
                                        isRTL={isRTL}
                                    />
                                )}
                                )}
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </motion.div>
            <div className="w-full h-[1px] gradient3" />
        </motion.li>
    );
};

interface SlotItemProps {
    slot: Slot;
    onSelect: () => void;
    isSelected: boolean;
    isDisabled: boolean;
    index: number;
    isRTL: boolean;
}

const SlotItem: React.FC<SlotItemProps> = ({
    slot,
    onSelect,
    isSelected,
    isDisabled,
    index,
    isRTL,
}) => {
    const { t } = useTranslation();
    return (
        <motion.div
            className={`bg-white shadow-md p-3 rounded-lg text-center flex flex-col gap-5 items-start ${
                isSelected ? "border-2 border-primary" : ""
            } ${isRTL ? "rtl" : "ltr"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: [0.04, 0.62, 0.23, 0.98],
            }}
        >
            <div className="flex items-center justify-center gap-2 font-cairo">
                <ClockIcon className="w-6 h-6 text-primary" />
                <p className="text-black whitespace-nowrap">
                    {isRTL ? slot.time_range : slot.time_range_en}
                </p>
            </div>
            <Button
                type={ButtonTypes.BUTTON}
                variant={
                    isSelected
                        ? ButtonVariants.DANGER
                        : ButtonVariants.PRIMARY
                }
                label={
                    isSelected
                        ? t("consultationList.selected")
                        : slot.is_reserved
                        ? t("consultationList.reserved")
                        : t("consultationList.reserve")
                }
                onClick={onSelect}
                isSubmitting={false}
                disabled={isDisabled}
            />
        </motion.div>
    );
};

export default ConsultationList;
