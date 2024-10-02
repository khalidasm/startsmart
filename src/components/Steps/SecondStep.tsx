import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import SelectInput from "../form components/SelectInput";
import TextInput from "../form components/TextInput";
import Button from "../global components/Button";
import { ButtonTypes, ButtonVariants } from "../../constants/constants";
import { Consultation, UserState, WorkshopType } from "../../typescript/types";
import Details from "../Details";
import WorkshopList from "../WorkshopList";
import ConsultationList from "../ConsultationList";
import { useTranslation } from "react-i18next";
import useLanguage, { LANGUAGE_OPTIONS } from "../../useLanguage";

interface SecondStepProps {
    nextStep: () => void;
    data: UserState;
}

const SecondStep: React.FC<SecondStepProps> = ({ nextStep, data }) => {
    const { t } = useTranslation();
    const { language } = useLanguage();
    const isRTL = language === LANGUAGE_OPTIONS.ARABIC;
    const [showWorkshops, setShowWorkshops] = useState<boolean>(false);
    const [workshops, setWorkshops] = useState<WorkshopType[]>([]);
    const [consultations, setConsultations] = useState<Consultation[]>([]);
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [selectedWorkshop, setSelectedWorkshop] = useState<
        WorkshopType | null
    >(null);
    const [isWorkshopLoading, setIsWorkshopLoading] = useState<boolean>(false);
    const [isConsultationLoading, setIsConsultationLoading] =
        useState<boolean>(false);

    const Toast: any = useRef(null);

    const genderOptions = [
        { label: t("secondStep.male"), value: "male" },
        { label: t("secondStep.female"), value: "female" },
    ];

    const saudiMobileRegex = /^9665[0-9]{8}$/;

    const formik = useFormik({
        initialValues: {
            email_smart: data.email_smart,
            first_name: data.first_name,
            last_name: data.last_name,
            mobile_smart: data.mobile_smart,
            gender: data.gender,
            position: data.position,
            company_name: data.company_name,
            workshops: data.workshops ?? [],
            investments: data.investments ?? [],
            consultancyslots: data.consultancyslots ?? [],
            lang: language,
        },
        validationSchema: Yup.object({
            first_name: Yup.string().required(
                t("secondStep.thisFieldRequired")
            ),
            last_name: Yup.string().required(t("secondStep.thisFieldRequired")),
            email_smart: Yup.string()
                .email(t("secondStep.invalidEmail"))
                .required(t("secondStep.thisFieldRequired")),
            mobile_smart: Yup.string()
                .matches(saudiMobileRegex, t("secondStep.invalidMobile"))
                .required(t("secondStep.thisFieldRequired")),
            gender: Yup.string().required(t("secondStep.thisFieldRequired")),
            position: Yup.string().required(t("secondStep.thisFieldRequired")),
            company_name: Yup.string().required(
                t("secondStep.thisFieldRequired")
            ),
        }),
        onSubmit: (values) => {
            const url = data.registered
                ? "https://api.hayaksa.com/api/event/103/ss2/registration/update/"
                : "https://api.hayaksa.com/api/event/103/ss2/registration/";

            axios[data.registered ? "put" : "post"](url, values)
                .then(() => {
                    Toast.current = toast.success(
                        data?.registered ? t("success.updateSuccess") : t("success.registrationSuccess"),{
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                    });
                    nextStep();
                })
                .catch(() => {
                    Toast.current = toast.error(
                        t("success.error")
                        , {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                    });
                })
                .finally(() => {
                    formik.setSubmitting(false);
                });
        },
    });

    useEffect(() => {
        fetchWorkshops();
        fetchConsultation();
    }, []);

    useEffect(() => {
        if (data?.gender) {
            genderOptions.forEach((option) => {
                if (option.value === data?.gender) {
                    formik.setFieldValue("gender", option.value);
                }
            });
        }
        if(data?.workshops && data?.workshops.length > 0 || data?.consultancyslots &&  data?.consultancyslots.length > 0){
            setShowWorkshops(true);
        }
    }, [data]);

    useEffect(() => {
        formik.setFieldValue("lang", language);
    }, [language]);

    const fetchWorkshops = async () => {
        setIsWorkshopLoading(true);
        axios
            .get<WorkshopType[]>(
                "https://api.hayaksa.com/api/event/103/ss2/workshop/list/"
            )
            .then((res) => {
                setWorkshops(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsWorkshopLoading(false);
            });
    };

    const fetchConsultation = async () => {
        setIsConsultationLoading(true);
        axios
            .get<Consultation[]>(
                "https://api.hayaksa.com/api/event/103/ss2/consultancys/consult/list/"
            )
            .then((res) => {
                setConsultations(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsConsultationLoading(false);
            });
    };

    const handleDetails = (item: WorkshopType): void => {
        setSelectedWorkshop(item);
        setShowDetails(true);
    };

    const handleClose = (): void => setShowDetails(false);

    const handleShowWorkshops = (): void => setShowWorkshops(!showWorkshops);

    if (isWorkshopLoading || isConsultationLoading) {
        return (
            <motion.div
                className="w-screen h-screen flex flex-col gap-3 justify-center items-center text-primary text-lg p-20 md:p-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="w-20 h-20">
                    <Loader />
                </div>
                <h1 className="font-cairo text-[25px] font-bold text-white">
                    {t("secondStep.loading")}
                </h1>
            </motion.div>
        );
    }

    // window.onbeforeunload = function () {
    //     return true;
    // };

    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`bg-white flex items-center justify-center h-full w-screen py-20 gradient px-5 md:px-0 ${isRTL ? 'rtl' : 'ltr'}`}
    >
        <form
            onSubmit={formik.handleSubmit}
            className="flex justify-center items-center text-primary text-lg h-fit flex-col gap-10 gradient w-[800px] px-5 rounded-2xl shadow-2xl py-10 border-2 border-secondary"
        >
            <h1 className="font-cairo text-[35px] font-bold text-black">
                {t('secondStep.pageTitle')}
            </h1>
            <div className="w-full h-full flex flex-col gap-5 items-center">
                <TextInput
                    label={t('secondStep.email')}
                    placeholder={t('secondStep.email')}
                    className="input_group--text_input"
                    value={formik.values.email_smart}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.email_smart && formik.errors.email_smart
                            ? formik.errors.email_smart
                            : ""
                    }
                    name="email_smart"
                    id="email_smart"
                    type="email"
                    disabled={true}
                />
                <TextInput
                    label={t('secondStep.firstName')}
                    placeholder={t('secondStep.firstName')}
                    className="input_group--text_input"
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.first_name && formik.errors.first_name
                            ? formik.errors.first_name
                            : ""
                    }
                    name="first_name"
                    id="first_name"
                    type="text"
                    disabled={data.registered}
                />
                <TextInput
                    label={t('secondStep.lastName')}
                    placeholder={t('secondStep.lastName')}
                    className="input_group--text_input"
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.last_name && formik.errors.last_name
                            ? formik.errors.last_name
                            : ""
                    }
                    name="last_name"
                    id="last_name"
                    type="text"
                    disabled={data.registered}
                />
                <TextInput
                    label={t('secondStep.mobile')}
                    placeholder={t('secondStep.mobileExample')}
                    className="input_group--text_input"
                    value={formik.values.mobile_smart}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.mobile_smart && formik.errors.mobile_smart
                            ? formik.errors.mobile_smart
                            : ""
                    }
                    name="mobile_smart"
                    id="mobile_smart"
                    type="text"
                    disabled={data.registered}
                />
                <SelectInput
                    label={t('secondStep.gender')}
                    placeholder={t('secondStep.gender')}
                    name="gender"
                    id="gender"
                    value={formik.values.gender}
                    onChange={(newValue: any) => {
                        formik.setFieldValue("gender", newValue?.value);
                    }}
                    onBlur={formik.handleBlur}
                    options={genderOptions}
                    isDisabled={data.registered}
                />
                <TextInput
                    label={t('secondStep.companyName')}
                    placeholder={t('secondStep.companyName')}
                    className="input_group--text_input"
                    value={formik.values.company_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.company_name && formik.errors.company_name
                            ? formik.errors.company_name
                            : ""
                    }
                    name="company_name"
                    id="company_name"
                    type="text"
                    disabled={data.registered}
                />
                <TextInput
                    label={t('secondStep.position')}
                    placeholder={t('secondStep.position')}
                    className="input_group--text_input"
                    value={formik.values.position}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.position && formik.errors.position
                            ? formik.errors.position
                            : ""
                    }
                    name="position"
                    id="position"
                    type="text"
                    disabled={data.registered}
                />
                <div className="relative flex items-center gap-2 w-full font-cairo"
                style={{
                    direction: isRTL ? 'rtl' : 'ltr'
                }}
                >
                    <input
                        type="checkbox"
                        id="showWorkshops"
                        name="showWorkshops"
                        checked={showWorkshops}
                        onChange={handleShowWorkshops}
                        className="appearance-none w-6 h-6 border-2 border-gray-300 rounded-md cursor-pointer transition-colors duration-200 ease-in-out checked:bg-primary checked::border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:checked:bg-primary hover:checked:bg-primary active:bg-primary"
                    />
                    <label
                        htmlFor="showWorkshops"
                        className="text-black font-bold"
                    >
                        {t('secondStep.workshopsQuestion')}
                    </label>
                </div>
                {showWorkshops && (
                    <>
                        <ul className="flex space-x-4 gradient2 p-2 shadow-lg rounded-2xl w-full">
                            <li className="flex-1">
                                <button
                                    className={`w-full h-12 text-black rounded-2xl text-xs md:text-lg font-cairo font-bold ${
                                        selectedTab === 0
                                            ? "bg-white"
                                            : "bg-transparent"
                                    } transition-colors ease-in-out duration-300`}
                                    onClick={() => setSelectedTab(0)}
                                    type="button"
                                >
                                    {t('secondStep.workshops')}
                                </button>
                            </li>
                            <li className="flex-1">
                                <button
                                    className={`w-full h-12 text-black rounded-2xl text-xs md:text-lg font-cairo font-bold ${
                                        selectedTab === 1
                                            ? "bg-white"
                                            : "bg-transparent"
                                    } transition-colors ease-in-out duration-300`}
                                    onClick={() => setSelectedTab(1)}
                                    type="button"
                                >
                                    {t('secondStep.consultationLab')}
                                </button>
                            </li>
                            <li className="flex-1">
                                <button
                                    className={`w-full h-12 text-black rounded-2xl text-xs md:text-lg font-cairo font-bold ${
                                        selectedTab === 2
                                            ? "bg-white"
                                            : "bg-transparent"
                                    } transition-colors ease-in-out duration-300`}
                                    onClick={() => setSelectedTab(2)}
                                    type="button"
                                >
                                    {t('secondStep.investmentForum')}
                                </button>
                            </li>
                        </ul>
                        <h1 className="font-cairo text-lg font-bold text-red-500"
                        style={{
                            direction: isRTL ? 'rtl' : 'ltr'
                        }}
                        >
                            {t('secondStep.priorityNotice')}
                        </h1>
                        <WorkshopList
                            workshops={workshops}
                            selectedTab={selectedTab}
                            formik={formik}
                            handleDetails={handleDetails}
                        />
                        {selectedTab === 1 && (
                            <ConsultationList
                                consultations={consultations}
                                formik={formik}
                            />
                        )}
                    </>
                )}
                <Button
                    type={ButtonTypes.SUBMIT}
                    variant={ButtonVariants.PRIMARY}
                    label={data.registered ? t('secondStep.updateData') : t('secondStep.register')}
                    isSubmitting={formik.isSubmitting}
                />
            </div>
        </form>
        <Details
            item={selectedWorkshop || null}
            isOpen={showDetails}
            onClose={handleClose}
        />
    </motion.div>
    );
};

export default SecondStep;
