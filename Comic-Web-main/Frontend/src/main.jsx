import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import Home from "./pages/Home";
import StoryDetail from "./pages/StoryDetail";
import ChapterReader from "./pages/ChapterReader";
import HotComics from "./pages/HotComics";
import CategoryComics from "./pages/CategoryComics";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/story/:id" element={<StoryDetail />} />
        <Route path="/chapter/:id" element={<ChapterReader />} />
        <Route path="/truyen-hot" element={<HotComics />} />
        <Route path="/the-loai/:id" element={<CategoryComics />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
