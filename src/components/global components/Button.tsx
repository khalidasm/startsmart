import { ButtonProps } from "../../typescript/types";
import Loader from "../Loader";

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type,
  variant,
  disabled,
  isSubmitting,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={variant}
      disabled={disabled || isSubmitting}
    >
      {isSubmitting ? 
      <Loader />
      : label}
    </button>
  );
};

export default Button;
