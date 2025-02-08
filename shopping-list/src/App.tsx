import "./i18n";
import "./App.scss";
import { useTranslation } from "react-i18next";
import useAuth from "./hooks/useAuth";
import Authentication from "./Components/Authentication";

function App() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();

  return (
    <div className="shopping-list-app">
      <dialog open={!isAuthenticated}>
        <Authentication />
      </dialog>
    </div>
  );
}

export default App;
