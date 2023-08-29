import Select, { ActionMeta } from "react-select";
import { optionType } from "../../constants/constants";

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

  return (
    <div className={`input_group ${error ? "input_group--error" : ""}`}>
      {label && <label htmlFor={name}>{label}</label>}
         <Select
        options={options}
        placeholder={placeholder}
        classNamePrefix={`${className} input_group--select`}
        onChange={onChange}
        onBlur={onBlur}
        value={options.find((option) => option.value === value)}
        name={name}
        id={id}
        isLoading={isLoading}
        isDisabled={isDisabled}
        isClearable={isClearable}
        isRtl
        isSearchable={isSearchable}
        key={id}
        
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            textTransform: "capitalize",
            border: error ? "1px solid #ef4444 !important" :
            state.isDisabled ? "1px solid #9ca3af" : "1px solid #0d97ae"
            ,
            outline: state.isFocused? 
            error ? "1px solid #b5da32 !important" : "1px solid #0d97ae"
            : "0px solid #0d97ae",
            cursor: "pointer",
            fontFamily: 'Poppins Medium',
            fontWeight:"lighter",
            borderRadius: "10px",
            backgroundColor: state.isDisabled ? "#9ca3af" : "#fff",
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            textTransform: "capitalize",
            cursor: "pointer",
            fontFamily: 'Poppins Medium',
            color: state.isSelected ? "#fff" : "#0d97ae",
            ":hover": {
              ...baseStyles[":hover"],
              backgroundColor: "#89CFF0",
            },
            ":active": {
              ...baseStyles[":active"],
              backgroundColor: "#89CFF0",
            },
            ":focus": {
              ...baseStyles[":focus"],
              backgroundColor: "#89CFF0",
            },
            backgroundColor: state.isSelected ? "#89CFF0 !important" : "#fff",
          }),
        }}
      />
      {error && <span className="input_group__error">{error}</span>}
    </div>
  );
};

export default SelectInput;
