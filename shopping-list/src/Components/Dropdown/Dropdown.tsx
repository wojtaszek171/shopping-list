import React from "react";
import "./Dropdown.scss";

interface DropdownProps {
  title?: string;
  options: { label: string; onClick: () => void }[];
}

const Dropdown: React.FC<DropdownProps> = ({ title, options }) => {
  return (
    <div className="dropdown-component">
      {title && <span className="dropdown-title">{title}</span>}
      {options.map((option, index) => (
        <button
          key={index}
          onClick={option.onClick}
          className="dropdown-option"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default Dropdown;
