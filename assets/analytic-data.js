import React, {Component} from 'react';
import {render} from "react-dom";
import AnalyticDataComponent from "./react/page/Survey/AnalyticDataComponent";
import "./css/app.css"

export default  function AnalyticData() {
    return (
        <>
            <AnalyticDataComponent/>
        </>
    )
}

render(<AnalyticData/>, document.getElementById('analytic_data'))