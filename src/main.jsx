import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./Router";
import "./index.css";
import { UserProvider } from "./contextApi/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <AppRouter />
  </UserProvider>
);
