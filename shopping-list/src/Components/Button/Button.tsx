import { ButtonHTMLAttributes } from "react";
import "./Button.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button = ({ className, ...props }: ButtonProps) => {
  return <button className={`styled-button ${className}`} {...props} />;
};

export default Button;
