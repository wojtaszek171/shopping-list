import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { store } from "./services/store.ts";
import { Provider } from "react-redux";
import { ContextMenuProvider } from "./Components/ContextMenu/ContextMenuProvider.tsx";
import { DialogProvider } from "./Components/Dialog/DialogProvider.tsx";
import { HeaderProvider } from "./Components/AppHeader/HeaderProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <HeaderProvider>
      <DialogProvider>
        <ContextMenuProvider>
          <StrictMode>
            <App />
          </StrictMode>
        </ContextMenuProvider>
      </DialogProvider>
    </HeaderProvider>
  </Provider>,
);
