import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ObservationForm from "./pages/ObservationForm";
import Success from "./pages/Success";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<ObservationForm />} />
            <Route path="/success" element={<Success />} />
        </Routes>
    </BrowserRouter>
);