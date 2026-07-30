import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { store } from "../store/store.ts";

import { Provider } from "./provider.tsx";
import "@/styles/globals.css";
import router from "./router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <Provider>
        <RouterProvider router={router} />
      </Provider>
    </ReduxProvider>
  </React.StrictMode>,
);
