import React from "react";
import "./Dropdown.scss";

interface DropdownProps {
  className?: string;
  title?: string;
  options: {
    label: string;
    onClick?: () => void;
    active?: boolean;
    isSeparator?: boolean;
  }[];
}

const Dropdown: React.FC<DropdownProps> = ({ title, options, className }) => {
  return (
    <div className={`dropdown-component${className ? ` ${className}` : ""}`}>
      {title && <span className="dropdown-title">{title}</span>}
      {options.map((option, index) => (
        <React.Fragment key={index}>
          {option.isSeparator ? (
            <div className="dropdown-separator" />
          ) : (
            <button
              onClick={option.onClick}
              className={`dropdown-option ${option.active ? "active" : ""}`}
            >
              {option.label}
            </button>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Dropdown;
