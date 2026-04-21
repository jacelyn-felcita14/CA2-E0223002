import "./App.css";
import AppRouter from "./router/AppRouter";
import { AppProvider } from "./context/AppContext";

const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};

export default App;
