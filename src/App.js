import "./App.css";
import Router from "./router/Router";
import { store } from "./redux/store/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Provider store={store}>
      <div>
        <Router />
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </Provider>
  );
}

export default App;

// https://www.uplabs.com/posts/shop-ecommerce-landing-page-design
