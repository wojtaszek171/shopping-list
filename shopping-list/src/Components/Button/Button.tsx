import { ButtonHTMLAttributes } from "react";
import "./Button.scss";

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button className="styled-button" {...props} />;
};

export default Button;
