import { useState, PropsWithChildren, ReactElement } from "react";
import { DialogContext } from "./useDialog";
import Button from "../Button";
import CloseIcon from "../../assets/icons/close.svg";

import "./Dialog.scss";

export interface DialogProps {
  title?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  error?: string;
  loading?: boolean;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
  closeButton?: boolean;
  content?: ReactElement | string;
  onClose?: () => void;
}

export const DialogProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<DialogProps | null>();

  const openDialog = (options: DialogProps) => {
    setOptions(options);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setOptions(null);
    options?.onClose?.();
  };

  const updateDialog = (newOptions: Partial<DialogProps>) => {
    setOptions((prevOptions) => ({ ...prevOptions, ...newOptions }));
  };

  const showFooter = options?.primaryButtonText || options?.secondaryButtonText;

  const handlePrimaryButtonClick = () => {
    options?.onPrimaryButtonClick?.();
  };

  const showHeader = options?.title || options?.closeButton;

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog, updateDialog }}>
      {children}
      {isOpen && (
        <dialog className="dialog" open={isOpen}>
          {showHeader && (
            <div className="dialog-header">
              <span className="dialog-title">{options?.title}</span>
              {options?.closeButton && (
                <Button size="icon" onClick={closeDialog}>
                  <CloseIcon />
                </Button>
              )}
            </div>
          )}
          <div className="dialog-content">{options?.content}</div>
          <span className="dialog-error">{options?.error}</span>
          {showFooter && (
            <div className="dialog-footer">
              {options.secondaryButtonText && (
                <Button
                  size="normal"
                  color="secondary"
                  onClick={() => options?.onSecondaryButtonClick?.()}
                >
                  {options?.secondaryButtonText}
                </Button>
              )}
              {options.primaryButtonText && (
                <Button
                  size="normal"
                  loading={options?.loading}
                  onClick={handlePrimaryButtonClick}
                >
                  {options?.primaryButtonText}
                </Button>
              )}
            </div>
          )}
        </dialog>
      )}
    </DialogContext.Provider>
  );
};
