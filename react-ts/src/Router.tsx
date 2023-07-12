import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./pages/App";
import Employee from "./pages/Employee";
import Employees from "./pages/Employees";

function AppRouter() {
  return (
    <React.StrictMode>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/employee-list" element={<Employee />} />
          <Route path="/" element={<App />} />
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default AppRouter;
