import { createContext } from "react";
import { ContextMenuContextProps } from "./ContextMenuProvider";

export const ContextMenuContext = createContext<
  ContextMenuContextProps | undefined
>(undefined);
