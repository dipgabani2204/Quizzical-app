import React from "react";
import { NavLink } from "react-router-dom";

import Main from "./Main"


export default function Home() {
    return (
        <div className="container">
            <div>
                <h2 className="title">Quizzical</h2>
            </div>
            <div>
                <h4 className="desc">Here, you can get unlimited knowledge :)</h4>
            </div>
            <div>
                <button className="btn-start-quiz"><NavLink to="/questions" className="start-quiz">  Start quiz </NavLink></button>
            </div>
        </div>
    )
}
