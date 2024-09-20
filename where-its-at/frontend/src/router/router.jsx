import { createBrowserRouter } from "react-router-dom";

import Events from "../pages/Events/Events";
import Buy from "../pages/Buy/Buy";
import Confirmation from "../pages/Confirmation/Confirmation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Events />,
  },
  {
    path: "/buy",
    element: <Buy />,
  },
  {
    path: "/confirmation",
    element: <Confirmation />,
  },
]);

export default router;
