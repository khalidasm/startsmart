import { useState } from "react";
import { TextInputProps } from "../../typescript/types";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  className,
  value,
  onChange,
  onBlur,
  error,
  name,
  id,
  type,
  required,
  disabled,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password" ? true : false;
  return (
    <div className={`input_group${error ? " input_group--error" : ""} ${disabled ? " input_group--disabled" : ""}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={
          isPassword && showPassword ? "text" : isPassword ? "password" : type
        }
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        id={id}
        disabled={disabled}
        required={required ? true : false}
      />
      {isPassword && (
        <i
          onClick={() => setShowPassword(!showPassword)}
          className="input_group--text_input__icon"
        >
          {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
        </i>
      )}
      {error && <span className="input_group__error">{error}</span>}
    </div>
  );
};

export default TextInput;
