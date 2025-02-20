import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Authentication from "./Components/Authentication";
import ListsView from "./Components/ListsView";
import ListDetailsView from "./Components/ListDetailsView/ListDetailsView";
import { useCheckSessionQuery } from "./services/api/user.api";
import { useEffect, useState } from "react";
import { allTags, api } from "./services/api/api";
import AppHeader from "./Components/AppHeader/AppHeader";
import "./i18n";
import "./App.scss";

const App = () => {
  const { isSuccess } = useCheckSessionQuery();
  const [title, setTitle] = useState<string | undefined>();

  useEffect(() => {
    if (isSuccess) {
      api.util.invalidateTags(allTags);
    }
  }, [isSuccess]);

  return (
    <Router>
      <div className="shopping-list-app">
        <AppHeader title={title} />
        <Routes>
          <Route path="/" element={<Navigate to="/lists" />} />
          <Route path="/lists" element={<ListsView />} />
          <Route
            path="/lists/:id"
            element={<ListDetailsView setTitle={setTitle} />}
          />
        </Routes>
        <Authentication />
      </div>
    </Router>
  );
};

export default App;
