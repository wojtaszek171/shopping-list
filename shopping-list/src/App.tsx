import "./i18n";
import "./App.scss";
import { useTranslation } from "react-i18next";
import Authentication from "./Components/Authentication";
import { useEffect, useState } from "react";
import { checkSession } from "./services/api";

function App() {
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    checkSession().then((response) => {
      setIsAuthenticated(!!response?.user);
    });
  }, []);

  return (
    <div className="shopping-list-app">
      {!isAuthenticated && (
        <dialog open={!isAuthenticated}>
          <Authentication />
        </dialog>
      )}
    </div>
  );
}

export default App;
