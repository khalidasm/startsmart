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

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type: ButtonTypes;
    variant: ButtonVariants;
    disabled?: boolean;
    isSubmitting?: boolean;
}

export type UserState = {
    email_smart: string;
    first_name: string;
    last_name: string;
    mobile_smart: string;
    gender: "";
    position: string;
    company_name: string;
    workshops: number[];
    investments: number[];
    consultancyslots: number[];
    registered: boolean;
};

export type WorkshopType = {
    brief: string;
    brief_en: string | null;
    capacity: number;
    category: string;
    category2: string;
    category2_en: string | null;
    category_en: string | null;
    date: string;
    date_en: string | null;
    id: number;
    is_full: boolean;
    mentor: string;
    mentor_en: string | null;
    order: number;
    time: string;
    time_en: string | null;
    title: string;
    title_en: string | null;
    vacancy: string;
    instructor: Instructor;
    zone_number: number;
    period: string;
    period_en: string | null;
};

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


export interface Slot {
    id: number;
    date: string;
    date_en: string;
    time: string;
    time_en: string;
    time_range: string;
    time_range_en: string;
    order: number;
    period: string;
    is_reserved: boolean;
  }
  
  export interface Instructor {
    id: number;
    name: string;
    name_en: string;
    brief: string;
    brief_en: string;
    photo: string;
    created_at: string;
    update_at: string;
    title: string;
    title_en: string;
  }
  
  export interface Consultation {
    id: number;
    title: string;
    title_en: string;
    brief: string;
    brief_en: string;
    order: number;
    period: string;
    period_en: string;
    type: string;
    type_en: string;
    instructor: Instructor;
    slots: Slot[];
    date: string;
    date_en: string;
  }
  