import { createBrowserRouter } from "react-router-dom";

import Dashboard from "../pages/client/Dashboard";
import StatisticData from "../pages/client/StatisticData";
import DevelopingIndex from "../pages/client/DevelopingIndex";
import AnalyticData from "../pages/client/AnalyticData";
import LayoutClient from "../layout/LayoutClient";

const clientPage = [
  {
    path: "/",
    element: <LayoutClient />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/static-data",
        element: <StatisticData />,
      },
      {
        path: "/developing-index",
        element: <DevelopingIndex />,
      },
      {
        path: "/analytic-data",
        element: <AnalyticData />,
      },
    ],
  },
];

export const RoutesClient = createBrowserRouter(clientPage, {
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
  },
});
