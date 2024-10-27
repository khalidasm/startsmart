import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import TextInput from "../form components/TextInput";
import Button from "../global components/Button";
import { ButtonTypes, ButtonVariants } from "../../constants/constants";
import { UserState } from "../../typescript/types";
import SocialLinks from "../SocialLinks";
import useLanguage, { LANGUAGE_OPTIONS } from "../../useLanguage";
import JameelLogo from '../../assets/images/jameel_logo.png'
import BabRizq from '../../assets/images/bab_rizq_logo.png'
interface FirstStepProps {
  handleUserData: (data: UserState) => void;
}

const FirstStep: React.FC<FirstStepProps> = ({ handleUserData }) => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const isRTL = language === LANGUAGE_OPTIONS.ARABIC;
  const REGISTERATION_CLOSED = true;

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t("firstStep.invalidEmail"))
        .required(t("firstStep.fieldRequired")),
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
      className="h-screen w-screen flex items-center justify-center mt-20 md:mt-0 px-5 md:px-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >

        
      <form
        onSubmit={formik.handleSubmit}
        className="flex justify-center items-center text-primary text-base md:text-lg w-[600px] flex-col gap-4 border-2 border-secondary rounded-2xl py-10 px-10"
      >
        {REGISTERATION_CLOSED ? <h1 className="font-cairo text-[22px] md:text-[30px] font-bold text-black leading-normal text-center">
          {t("firstStep.event_ended")}
        </h1>: <>
        
        <h1 className="font-cairo text-[22px] md:text-[35px] font-bold text-black leading-normal text-center">
          {t("firstStep.registration")}
        </h1> 
               

        <div dir={isRTL ? "rtl":"ltr"}>
          <p className="color-[##92b028] text-justify">{t("firstStep.registrationSubTitle")}</p>
         
          <h1 className="font-cairo text-[22px]font-bold text-black leading-normal text-center mt-2">
            {t("firstStep.event_callout")}
          </h1>
        </div>

        <div className="w-full flex flex-col gap-5 items-center">
          <TextInput
            label={t("firstStep.email")}
            placeholder={t("firstStep.emailPlaceholder")}
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
            label={t("firstStep.next")}
            isSubmitting={formik.isSubmitting}
          />
        </div>

        </>}
         

       

        <SocialLinks />
        <h1 className="font-cairo text-lg font-bold leading-normal text-center">{t('firstStep.supported_by')}</h1>
        <div className="flex gap-12">
            <img src={JameelLogo} className="h-12" />
            <img src={BabRizq} className="h-12" />
        </div>
      </form>
    </motion.div>
  );
};

export default FirstStep;
