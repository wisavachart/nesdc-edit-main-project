import React from "react";
import "./client-main.css";
import { RouterProvider } from "react-router-dom";
import { RoutesClient } from "./routes/route-client";

function AppClient() {
  return (
    <RouterProvider
      router={RoutesClient}
      future={{ v7_startTransition: true }}
    />
  );
}
export default AppClient;
