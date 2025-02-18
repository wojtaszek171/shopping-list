import { createContext, useContext } from "react";
import { DialogProps } from "./DialogProvider";

interface DialogContextType {
  openDialog: (options: DialogProps) => void;
  closeDialog: () => void;
  updateDialog: (options: Partial<DialogProps>) => void;
}

export const DialogContext = createContext<DialogContextType>({
  openDialog: () => {},
  closeDialog: () => {},
  updateDialog: () => {},
});

export const useDialog = () => {
  const context = useContext<DialogContextType>(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};
