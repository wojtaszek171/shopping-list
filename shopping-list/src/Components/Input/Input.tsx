import { InputHTMLAttributes, useState } from "react";
import "./Input.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const Input = ({ label, type, ...props }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`input-container ${props.className}`}>
      <input
        className="styled-input"
        {...props}
        type={type === "password" && showPassword ? "text" : type}
        placeholder=" "
      />
      {label && <label className="styled-input-label">{label}</label>}
      {type === "password" && (
        <button
          type="button"
          className="show-password-button"
          onClick={toggleShowPassword}
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
      )}
    </div>
  );
};

export default Input;
