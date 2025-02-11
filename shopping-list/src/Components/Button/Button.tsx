import { ButtonHTMLAttributes } from "react";
import "./Button.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  size?: "big" | "normal" | "small" | "icon";
}

const Button = ({ className, size = "normal", ...props }: ButtonProps) => {
  return <button className={`styled-button ${size} ${className}`} {...props} />;
};

export default Button;
