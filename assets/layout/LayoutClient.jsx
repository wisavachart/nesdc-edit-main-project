import React from "react";
import ClientSideBar from "../components/menu/client-sidebar";
import { Outlet } from "react-router-dom";

const LayoutClient = () => {
  return (
    <main className="flex h-screen w-full bg-gray-900 text-gray-100">
      <ClientSideBar />
      <Outlet />
    </main>
  );
};

export default LayoutClient;
