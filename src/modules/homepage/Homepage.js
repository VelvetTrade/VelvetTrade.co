import React from 'react';
import '../../css/Homepage.css';
import { Link } from 'react-router-dom'

function Homepage() {
  return (
    <div className="Homepage">
      <p>This is the homepage</p>
      <Link to={"/test"}>Here's a random link</Link>
    </div>
  );
}

export default Homepage;
