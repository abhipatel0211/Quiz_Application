import "../styles/App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

/** import components */
import Main from "./Main";
import Quiz from "./Quiz";
import Result from "./Result";
import { CheckUserExist } from "../helper/helper";
import Selectlang from "./Selectlang";
import Loginsignup from "./loginsignup";

// /** react routes */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Loginsignup />,
  },
  {
    path: "/selectlang",
    element: <Selectlang />,
  },
  {
    path: "/javascript",
    element: <Quiz lang="javascript" />,
  },
  {
    path: "/cpp",
    element: <Quiz lang="cpp" />,
  },
  {
    path: "/english",
    element: <Quiz lang="english" />,
  },
  {
    path: "/hindi",
    element: <Quiz lang="hindi" />,
  },
  {
    path: "/result",
    element: <Result />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
