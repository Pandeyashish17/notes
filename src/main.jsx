import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import ErrorPage from "./pages/404"
import Sidebar from "./components/Sidebar";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Sidebar title="Your Notes">
        <h1>Hello</h1>
      </Sidebar>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: "/archive",
    element: (
      <Sidebar title="Archive">
        <h1>Hello archive</h1>
      </Sidebar>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
