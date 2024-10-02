import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import TextInput from "../form components/TextInput";
import Button from "../global components/Button";
import { ButtonTypes, ButtonVariants } from "../../constants/constants";
import { UserState } from "../../typescript/types";
import SocialLinks from "../SocialLinks";

interface FirstStepProps {
    handleUserData: (data: UserState) => void;
}

const FirstStep: React.FC<FirstStepProps> = ({ handleUserData }) => {
    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: { email: "" },
        validationSchema: Yup.object({
            email: Yup.string()
                .email(t('firstStep.invalidEmail'))
                .required(t('firstStep.fieldRequired')),
        }),
        onSubmit: (values) => {
            axios
                .get<UserState>(
                    `https://api.hayaksa.com/api/event/103/ss2/registration/check/?email=${values.email}`
                )
                .then(async (res) => {
                    await handleUserData(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    });

    return (
        <motion.div
            className="h-screen w-screen flex items-center justify-center gradient px-5 md:px-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <form
                onSubmit={formik.handleSubmit}
                className="flex justify-center items-center text-primary text-lg w-[600px] flex-col gap-10 border-2 border-secondary rounded-2xl py-20 px-10"
            >
                <h1 className="font-cairo text-[35px] font-bold text-black">
                    {t('firstStep.registration')}
                </h1>
                <div className="w-full flex flex-col gap-5 items-center">
                    <TextInput
                        label={t('firstStep.email')}
                        placeholder={t('firstStep.emailPlaceholder')}
                        className="input_group--text_input"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.email && formik.errors.email
                                ? formik.errors.email
                                : ""
                        }
                        name="email"
                        id="email"
                        type="email"
                        disabled={formik.isSubmitting}
                    />
                    <Button
                        type={ButtonTypes.SUBMIT}
                        variant={ButtonVariants.PRIMARY}
                        label={t('firstStep.next')}
                        isSubmitting={formik.isSubmitting}
                    />
                </div>
                <SocialLinks />
            </form>
        </motion.div>
    );
};

export default FirstStep;