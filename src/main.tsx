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

i18n.use(initReactI18next).init(TRANSLATION_SETUP);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <I18nextProvider i18n={i18n}>
            <Navbar />
            <Registeration />
            <ToastContainer />
        </I18nextProvider>
    </React.StrictMode>
);
