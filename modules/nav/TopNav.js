import React from "react";
import "../../css/TopNav.css";

const TopNav = ({sticky}) => (
  <div id="navbase" className={sticky? "topnav-sticky" : "topnav"}>
    <h3 className="title">VelvetTrade</h3>
  </div>
)

export default TopNav;