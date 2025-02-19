import { ButtonHTMLAttributes } from "react";
import Loader from "../Loader";
import "./Button.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  size?: "big" | "normal" | "small" | "icon";
  color?: "primary" | "secondary";
  loading?: boolean;
}

const Button = ({
  className,
  size = "normal",
  color = "primary",
  loading,
  children,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`styled-button ${size} ${className} ${color}`}
      disabled={disabled || loading}
      {...props}
    >
      {children}
      {loading && <Loader className="button-loader" color="white" />}
    </button>
  );
};

export default Button;
