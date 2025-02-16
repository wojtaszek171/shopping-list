import Authentication from "./Components/Authentication";
import ListsView from "./Components/ListsView";
import { useCheckSessionQuery } from "./services/api/user.api";
import { useEffect } from "react";
import { allTags, api } from "./services/api/api";
import "./i18n";
import "./App.scss";

const App = () => {
  const { isSuccess } = useCheckSessionQuery();

  useEffect(() => {
    if (isSuccess) {
      api.util.invalidateTags(allTags);
    }
  }, [isSuccess]);

  return (
    <div className="shopping-list-app">
      <ListsView />
      <Authentication />
    </div>
  );
};

export default App;
