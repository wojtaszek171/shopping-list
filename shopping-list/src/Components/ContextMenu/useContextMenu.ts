import { useContext } from "react";
import { ContextMenuContextProps } from "./ContextMenuProvider";
import { ContextMenuContext } from "./ContextMenuContext";

export const useContextMenu = (): ContextMenuContextProps => {
  const context = useContext(ContextMenuContext);
  if (!context) {
    throw new Error("useContextMenu must be used within a ContextMenuProvider");
  }
  return context;
};
