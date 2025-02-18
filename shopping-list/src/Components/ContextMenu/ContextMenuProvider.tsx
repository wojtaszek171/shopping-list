import { useState, useCallback, PropsWithChildren } from "react";
import ContextMenu, { ContextMenuOption } from "./ContextMenu";
import { ContextMenuContext } from "./ContextMenuContext";

export interface ContextMenuContextProps {
  openMenu: (
    title: string,
    options: ContextMenuOption[],
    position: { x: number; y: number },
  ) => void;
  closeMenu: () => void;
}

export const ContextMenuProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuProps, setMenuProps] = useState<{
    title?: string;
    options: ContextMenuOption[];
  }>({
    title: undefined,
    options: [],
  });
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const openMenu = useCallback(
    (
      title: string,
      options: ContextMenuOption[],
      position: { x: number; y: number },
    ) => {
      setMenuProps({ title, options });
      setMenuPosition(position);
      setIsOpen(true);
    },
    [],
  );

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ContextMenuContext.Provider value={{ openMenu, closeMenu }}>
      {children}
      <ContextMenu
        isOpen={isOpen}
        title={menuProps.title}
        options={menuProps.options}
        onClose={closeMenu}
        position={menuPosition}
      />
    </ContextMenuContext.Provider>
  );
};
