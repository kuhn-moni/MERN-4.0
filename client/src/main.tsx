import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Error404 from "./pages/Error404.tsx";
import Homepage from "./pages/Homepage.tsx";
import WithNav from "./components/layouts/WithNav.tsx";
import Login from "./pages/Login.tsx";
import App from "./App.tsx";
// import './index.css'

const router = createBrowserRouter([
  {
    element: (
      <WithNav>
        <Outlet />
      </WithNav>
    ),
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/users",
        element: <App />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
