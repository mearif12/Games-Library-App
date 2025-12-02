import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Game from "./components/Game";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/game",
    element: <Game />,
  },
]);

export default router;
