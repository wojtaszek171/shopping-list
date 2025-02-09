import { InputHTMLAttributes } from "react";
import "./Input.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
}

const Input = ({ label, ...props }: InputProps) => {
  return (
    <div className={`input-container ${props.className}`}>
      <input className="styled-input" {...props} placeholder=" " />
      <label className="styled-input-label">{label}</label>
    </div>
  );
};

export default Input;
