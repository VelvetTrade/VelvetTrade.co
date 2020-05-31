import React from "react";
import "./TopNav.css";

const TopNav = ({sticky}) => (
  <div id="navbase" className={sticky? "topnav-sticky" : "topnav"}>
    <h4>VelvetTrade</h4>
  </div>
)

export default TopNav;