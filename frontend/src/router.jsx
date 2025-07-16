import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ChatPage from "./pages/ChatPage";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Login />,
      },
      {
        path: "chat",
        element: <ChatPage />,
      },
    ],
  },
]);

export default router;
