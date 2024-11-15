import React, {Component} from 'react';
import {render} from "react-dom";
import DevelopingIndexComponent from "./react/page/Survey/DevelopingIndexComponent";
import "./css/app.css"

export default  function DevelopingIndex() {
    return (
        <>
            <DevelopingIndexComponent/>
        </>
    )
}

render(<DevelopingIndex/>, document.getElementById('developing_index'))