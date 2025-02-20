import React from "react";
import "./Dropdown.scss";

interface DropdownProps {
  options: { label: string; onClick: () => void }[];
}

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
  return (
    <div className="dropdown-component">
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
