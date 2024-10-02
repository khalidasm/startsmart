import React from 'react';
import Select, { ActionMeta } from "react-select";
import { optionType } from "../../typescript/types";
import useLanguage, { LANGUAGE_OPTIONS } from '../../useLanguage';

type SelectProps = {
  label?: string;
  placeholder: string;
  className?: string;
  value: string;
  options: optionType[];
  onChange: (newValue: optionType | null, actionMeta: ActionMeta<optionType>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  name: string;
  id: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  withCode?: boolean;
};

const SelectInput = ({
  label,
  placeholder,
  className,
  value,
  options,
  onChange,
  onBlur,
  error,
  name,
  id,
  isLoading,
  isDisabled,
  isClearable,
  isSearchable,
}: SelectProps) => {
  const { language } = useLanguage();
  const isRTL = language === LANGUAGE_OPTIONS.ARABIC;

  return (
    <div className={`input_group ${error ? "input_group--error" : ""}`}>
      {label && <label htmlFor={name}>{label}</label>}
      
      <Select
        options={options}
        placeholder={placeholder}
        classNamePrefix={`${className} input_group--select font-cairo`}
        onChange={onChange}
        onBlur={onBlur}
        value={options.find((option) => option.value === value)}
        name={name}
        id={id}
        isLoading={isLoading}
        isDisabled={isDisabled}
        isClearable={isClearable}
        isRtl={isRTL}
        isSearchable={isSearchable}
        key={id}
        
        styles={{
          singleValue: (baseStyles) => ({
            ...baseStyles,
            color: "#000",
            textAlign: isRTL ? 'right' : 'left',
          }),
          control: (baseStyles, state) => ({
            ...baseStyles,
            textTransform: "capitalize",
            border: error ? "1px solid #ef4444 !important" :
              state.isDisabled ? "1px solid #9ca3af" : "1px solid #b5da32",
            outline: state.isFocused ? 
              error ? "1px solid #b5da32 !important" : "1px solid #b5da32"
              : "0px solid #0d97ae",
            cursor: "pointer",
            fontFamily: 'Cairo',
            borderRadius: "10px",
            backgroundColor: state.isDisabled ? "#9ca3af" : "#fff",
            color: state.isDisabled ? "#9ca3af" : "#0d97ae",
            direction: isRTL ? 'rtl' : 'ltr',
          }),
          placeholder: (baseStyles) => ({
            ...baseStyles,
            color: "#9ca3af",
            fontFamily: 'Cairo',
            textAlign: isRTL ? 'right' : 'left',
          }),
          indicatorSeparator: (baseStyles) => ({
            ...baseStyles,
            display: "none",
          }),
          dropdownIndicator: (baseStyles, state) => ({
            ...baseStyles,
            color: state.isDisabled ? "#9ca3af" : "#b5da32",
            cursor: "pointer",
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            textTransform: "capitalize",
            cursor: "pointer",
            fontFamily: 'Cairo',
            color: state.isSelected ? "#fff" : "#0d97ae",
            textAlign: isRTL ? 'right' : 'left',
            ":hover": {
              ...baseStyles[":hover"],
              backgroundColor: "#b5da32",
              color: "#fff",
            },
            ":active": {
              ...baseStyles[":active"],
              backgroundColor: "#b5da32",
            },
            ":focus": {
              ...baseStyles[":focus"],
              backgroundColor: "#b5da32",
            },
            backgroundColor: state.isSelected ? "#0d97ae !important" : "#fff",
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
            textAlign: isRTL ? 'right' : 'left',
          }),
        }}
      />
      {error && <span className="input_group__error">{error}</span>}
    </div>
  );
};

export default SelectInput;