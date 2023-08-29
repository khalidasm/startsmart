import { FormikErrors } from "formik";
import { ButtonTypes, ButtonVariants } from "../constants/constants";

export type TextInputProps = {
    label?: string;
    placeholder?: string;
    className?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    error?: FormikErrors<string>;
    name?: string;
    id?: string;
    iconFunction?: () => void;
    type?: string;
    required?: boolean;
    disabled?: boolean;
    withButton?: boolean;
    onClick?: () => void;
  };


export type ButtonProps = {
    label: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type: ButtonTypes;
    variant: ButtonVariants;
    disabled?: boolean;
    isSubmitting?: boolean;
  };


export type UserState = {
    email_smart: string;
    first_name: string;
    last_name: string;
    mobile_smart: string;
    gender: "";
    position: string;
    company_name: string;
    zones: number[];
    registered: boolean;
  };


export type WorkshopType = {
  id: number;
  title: string;
  period: string;
}


export type optionType = {
  label: string;
  value: string;
};

export type FormField = {
  translation: string;
  type: string;
  options?: optionType[];
};

export type FormFieldTypes = {
  [key: string]: FormField;
};



