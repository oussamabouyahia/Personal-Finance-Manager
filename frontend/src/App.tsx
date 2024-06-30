import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
