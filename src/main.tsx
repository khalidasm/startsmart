import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import Registeration from "./components/Registeration.tsx";
import Navbar from "./components/navbar.tsx";
import i18n from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
import TRANSLATION_SETUP from "./Translations.ts";
import "./styles/index.scss";
import "react-toastify/dist/ReactToastify.css";
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Charts from "./components/Charts.tsx";

i18n.use(initReactI18next).init(TRANSLATION_SETUP);
const router = createBrowserRouter([
    {
      path: "/",
      element:  
      <Registeration />
     
    },
    {
        path:'/event-statistics-summarization',
        element:<Charts/>
    }
  ]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
<I18nextProvider i18n={i18n}>
<Navbar />
<RouterProvider router={router} />
<ToastContainer />
</I18nextProvider>,
       
    </React.StrictMode>
);
