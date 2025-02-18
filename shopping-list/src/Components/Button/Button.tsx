import { ButtonHTMLAttributes } from "react";
import "./Button.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  size?: "big" | "normal" | "small" | "icon";
  color?: "primary" | "secondary";
}

const Button = ({
  className,
  size = "normal",
  color = "primary",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`styled-button ${size} ${className} ${color}`}
      {...props}
    />
  );
};

export default Button;
