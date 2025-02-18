import React, { useEffect, useState, useRef, useCallback } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import "./ContextMenu.scss";

export interface ContextMenuOption {
  text: string;
  icon?: React.ReactNode;
  action?: (e: ReactMouseEvent<HTMLElement>) => void;
}

interface ContextMenuProps {
  isOpen: boolean;
  title?: string;
  options: ContextMenuOption[];
  onClose: () => void;
  position: { x: number; y: number };
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  isOpen,
  title,
  options,
  onClose,
  position,
}) => {
  const [adjustedPosition, setAdjustedPosition] = useState(position);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && ref.current) {
      const { innerWidth, innerHeight } = window;
      const menu = ref.current as HTMLElement;
      if (menu) {
        const { offsetWidth, offsetHeight } = menu;
        const newX =
          position.x + offsetWidth > innerWidth
            ? innerWidth - offsetWidth
            : position.x;
        const newY =
          position.y + offsetHeight > innerHeight
            ? innerHeight - offsetHeight
            : position.y;
        setAdjustedPosition({ x: newX, y: newY });
      }
    }
  }, [isOpen, position]);

  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          onClose();
        }
      };
      const handleBlur = () => {
        onClose();
      };
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("blur", handleBlur);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        window.removeEventListener("blur", handleBlur);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button === 2) {
      // Right-click
      event.preventDefault(); // Prevent native context menu
      onClose();
      setTimeout(() => {
        const element = document.elementFromPoint(event.clientX, event.clientY);
        if (element) {
          const rightClickEvent = new MouseEvent("contextmenu", {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: event.clientX,
            clientY: event.clientY,
          });
          element.dispatchEvent(rightClickEvent);
        }
      }, 0);
    }
  };

  const handleAction =
    (option: ContextMenuOption) => (e: ReactMouseEvent<HTMLElement>) => {
      e.stopPropagation();
      option.action?.(e);
      onClose();
    };

  return (
    <div className="context-menu">
      <div
        className="context-menu__overlay"
        onClick={onClose}
        onContextMenu={handleOverlayClick}
      ></div>
      <div
        ref={ref}
        className="context-menu__content"
        style={{ top: adjustedPosition.y, left: adjustedPosition.x }}
        role="menu"
        aria-labelledby={"menu-title"}
      >
        {title && (
          <h3 id="menu-title" className="context-menu__title">
            {title}
          </h3>
        )}
        <ul className="context-menu__options">
          {options.map((option, index) => (
            <li
              key={index}
              className="context-menu__option"
              onClick={handleAction(option)}
              role="menuitem"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleAction(option);
                }
              }}
            >
              {option.icon && (
                <span className="context-menu__icon">{option.icon}</span>
              )}
              <span>{option.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContextMenu;
