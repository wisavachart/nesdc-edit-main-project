import React, { Component, useEffect } from "react";
import { render } from "react-dom";
import SurveyComponent from "./react/page/Survey/SurveyComponent";
import "./css/app.css";
import EconomicApi from "./react/api/EconomicApi";
import KuPovertyRatioApi from "./react/api/KuPovertyRatioApi";

export default function Survey() {
  // useEffect(() => {
  //   console.log("แบบนี้ไม่ติดคอเลย");
  //   getYear();
  // }, []); // Empty dependency array to run once on mount

  // const getYear = async () => {
  //   try {
  //     const data = await EconomicApi.getYear();
  //     console.log("Fetched data:", data);
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  useEffect(() => {
    fetchdata();
  }, []);

  async function fetchdata() {
    let data1 = {
      provinceId: null,
      graphNo: 1,
      developFactor: "population",
    };

    let dataList1 = await KuPovertyRatioApi.getDataGraph(data1);
    console.log("แบบไม่มี Header");
    console.log(dataList1);
  }

  return (
    <>
      <SurveyComponent />
    </>
  );
}

render(<Survey />, document.getElementById("survey"));
