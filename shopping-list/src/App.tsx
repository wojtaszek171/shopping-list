import Authentication from "./Components/Authentication";
import { Provider } from "react-redux";
import { store } from "./services/store";
import ListsView from "./Components/ListsView";
import "./i18n";
import "./App.scss";

const App = () => {
  return (
    <Provider store={store}>
      <div className="shopping-list-app">
        <ListsView />
        <Authentication />
      </div>
    </Provider>
  );
};

export default App;
