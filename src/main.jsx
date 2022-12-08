import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import ErrorPage from "./pages/404";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import AddNote from "./pages/AddNote";
import Edit from "./pages/Edit";
import Archive from "./pages/Archive";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Sidebar title="Your Notes">
        <Home />
      </Sidebar>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/edit/:id",
    element: (
      <Sidebar title="Details">
        <Edit />
      </Sidebar>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/archive",
    element: (
      <Sidebar title="Archive">
        <Archive />
      </Sidebar>
    ),
  },
  {
    path: "/add",
    element: (
      <Sidebar title="Add Todo">
        <AddNote />
      </Sidebar>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
