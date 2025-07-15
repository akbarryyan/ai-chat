import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ChatPage from "./components/ChatPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <ChatPage />,
      },
    ],
  },
]);

export default router;
