import { SelectHTMLAttributes, ReactNode } from "react";
import "./Select.scss";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  className?: string;
  options: (string | ReactNode)[];
}

const Select = ({ label, className, options, ...props }: SelectProps) => {
  return (
    <div className={`select-container ${className}`}>
      <select {...props} className="styled-select">
        {options.map((option, index) => (
          <option
            key={index}
            value={typeof option === "string" ? option : undefined}
          >
            {option}
          </option>
        ))}
      </select>
      {label && <label className="styled-select-label">{label}</label>}
    </div>
  );
};

export default Select;
