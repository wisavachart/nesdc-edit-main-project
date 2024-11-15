import React from "react";
import Logo from "./logo";
import ClientMenuList from "./client-menu-list";

const ClientSideBar = () => {
  return (
    <main className="h-screen check overflow-hidden">
      {/* <Logo /> */}
      <ClientMenuList />
    </main>
  );
};

export default ClientSideBar;
