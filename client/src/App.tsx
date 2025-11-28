import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ThemeModeProvider } from "./utils/ThemeMode";
import { Router } from "./Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./redux/store/store";

function App() {
  return (
    <Provider store={store}>
      <ThemeModeProvider>
        <RouterProvider router={Router} />
        <ToastContainer
          position="bottom-right"
          theme="dark"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
          pauseOnHover
        />
      </ThemeModeProvider>
    </Provider>
  );
}

export default App;
