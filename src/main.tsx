import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import "./app/globals.css";

import Home from "./pages/Home";
import Key from "./pages/Key";

const routerBaseName = import.meta.env.BASE_URL;

function App() {
  return (
    <BrowserRouter basename={routerBaseName}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/key" element={<Key />} />
      </Routes>
      <Toaster richColors />
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
