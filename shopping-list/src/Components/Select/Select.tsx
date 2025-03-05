import { useState, useRef, useEffect } from "react";
import { SelectHTMLAttributes, ReactNode } from "react";
import "./Select.scss";

interface SelectProps extends SelectHTMLAttributes<HTMLDivElement> {
  label?: string;
  className?: string;
  options: {
    key: string;
    value: string | ReactNode;
  }[];
}

const Select = ({ label, className, options, ...props }: SelectProps) => {
  const [selectedOption, setSelectedOption] = useState<string | ReactNode>(
    options[0].value,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStyles, setDropdownStyles] = useState({});
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (value: string | ReactNode) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

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
        {selectedOption}
      </div>
      {isOpen && (
        <div className="options-container" style={dropdownStyles}>
          {options.map(({ key, value }) => (
            <div
              key={key}
              className="option"
              onClick={() => handleOptionClick(value)}
            >
              {value}
            </div>
          ))}
        </div>
      )}
      {label && <label className="styled-select-label">{label}</label>}
    </div>
  );
};

export default Select;
