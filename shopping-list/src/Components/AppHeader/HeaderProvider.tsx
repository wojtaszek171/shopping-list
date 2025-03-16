import React, {
  createContext,
  useState,
  ReactNode,
  ReactElement,
  MouseEvent,
} from "react";

interface HeaderButton {
  action: (e: MouseEvent<HTMLButtonElement>) => void;
  title?: string;
  icon?: ReactElement;
  hidden?: boolean;
  active?: boolean | (() => boolean);
  color?: string;
}

interface HeaderContextProps {
  title: string;
  setTitle: (title: string) => void;
  buttons: HeaderButton[];
  setButtons: (buttons: HeaderButton[]) => void;
}

export const HeaderContext = createContext<HeaderContextProps>({
  title: "",
  setTitle: () => {},
  buttons: [],
  setButtons: () => {},
});

export const HeaderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [title, setTitle] = useState<string>("");
  const [buttons, setButtons] = useState<HeaderButton[]>([]);

  return (
    <HeaderContext.Provider value={{ title, setTitle, buttons, setButtons }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => {
  const context = React.useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeader must be used within a HeaderProvider");
  }
  return context;
};
