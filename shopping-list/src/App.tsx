import Authentication from "./Components/Authentication";
import { Provider } from "react-redux";
import { store } from "./services/store";
import "./i18n";
import "./App.scss";

const App = () => {
  return (
    <Provider store={store}>
      <div className="shopping-list-app">
        <Authentication />
      </div>
    </Provider>
  );
};

export default App;
