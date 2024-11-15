import React, { Component } from "react";
import { render } from "react-dom";
import StaticDataComponent from "./react/page/Survey/StaticDataComponent";
import "./css/app.css";

export default function StaticData() {
  return (
    <>
      <StaticDataComponent />
    </>
  );
}

render(<StaticData />, document.getElementById("static_data"));
