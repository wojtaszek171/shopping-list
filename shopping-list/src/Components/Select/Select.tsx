import { useState, useRef, useEffect } from "react";
import { SelectHTMLAttributes, ReactNode } from "react";
import "./Select.scss";

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLDivElement>, "onChange"> {
  label?: string;
  className?: string;
  options: {
    key: string;
    value: string | ReactNode;
    optionLabel: string | ReactNode;
  }[];
  onChange?: (key: string) => void;
}

const Select = ({
  label,
  className,
  options,
  value,
  onChange,
  ...props
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStyles, setDropdownStyles] = useState({});
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (key: string) => {
    setIsOpen(false);
    if (onChange) {
      onChange(key);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const availableSpaceBelow = window.innerHeight - rect.bottom;
      const availableSpaceAbove = rect.top;
      const fitsBelow = availableSpaceBelow >= 200;
      const maxHeight =
        Math.min(200, fitsBelow ? availableSpaceBelow : availableSpaceAbove) -
        10; // 10px padding

      setDropdownStyles({
        maxHeight: `${maxHeight}px`,
        top: fitsBelow ? "100%" : "auto",
        bottom: fitsBelow ? "auto" : "100%",
      });
    }
  }, [isOpen]);

  return (
    <div
      className={`select-container ${className}`}
      {...props}
      ref={containerRef}
    >
      <div className="styled-select" onClick={() => setIsOpen(!isOpen)}>
        {options.find((option) => option.key === value)?.value ??
          options[0].value}
      </div>
      {isOpen && (
        <div className="options-container" style={dropdownStyles}>
          {options.map(({ key, value, optionLabel }) => (
            <div
              key={key}
              className="option"
              onClick={() => handleOptionClick(key)}
            >
              {optionLabel ?? value}
            </div>
          ))}
        </div>
      )}
      {label && <label className="styled-select-label">{label}</label>}
    </div>
  );
};

export default Select;
