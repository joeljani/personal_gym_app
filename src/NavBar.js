import React from "react";
import {Link} from "@reach/router";
import "./NavBar.css";


const NavBar = () => {

    const changeFocus = (nav) => {
        let workoutsNav = document.getElementsByClassName("workoutsNav")[0]
        let statisticsNav = document.getElementsByClassName("statisticsNav")[0]
        if(nav === "workouts") {
            workoutsNav.style.opacity = 1
            statisticsNav.style.opacity = 0.5
        } else {
            statisticsNav.style.opacity = 1
            workoutsNav.style.opacity = 0.5
        }
    }

    return (
        <div>
            <header>
                <div id={"navigation"} className={"navBarGrid"}>
                        <Link to='/' className={"workoutsNav"}
                              onClick={() =>changeFocus("workouts")}>
                            Workouts
                        </Link>
                        <Link to='statistics' className={"statisticsNav"}
                              onClick={() =>changeFocus("statistics")}
                              style={{opacity: 0.5}}>
                            Statistics
                        </Link>
                </div>
            </header>
        </div>
    )
}





export default NavBar;
