import { Navigate } from "react-router";
import { JournalPage } from "../pages/JournalPage";

export const JournalRoutesNew = [
    {
      index: true,
      element: <JournalPage />,
    },
    {
      path: "/*",
      element: <Navigate to={"/"} />,
    },
  ];