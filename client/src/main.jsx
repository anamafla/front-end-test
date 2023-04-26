import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Details, { detailsLoader } from "./Details";
import ResultList, { resultsLoader } from "./ResultList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "items?", element: <ResultList />, loader: resultsLoader },
      { path: "items/:id", element: <Details />, loader: detailsLoader },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
