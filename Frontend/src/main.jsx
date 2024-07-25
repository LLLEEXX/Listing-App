import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import { Loader } from "./components/Loader.jsx";
const App = React.lazy(() => import("./App.jsx"));

//Translation
import global_en from "./translations/en/global.json";
import global_es from "./translations/es/global.json";

import i18n from "i18next";
import { I18nextProvider } from "react-i18next";

i18n.init({
  resources: {
    en: {
      global: global_en,
    },
    es: {
      global: global_es,
    },
    // Add other languages as needed
  },
  fallbackLng: "en",
  debug: true,

  interpolation: {
    escapeValue: true,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <React.Suspense fallback={<Loader />}>
      <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </I18nextProvider>
    </React.Suspense>
  </React.StrictMode>
);
