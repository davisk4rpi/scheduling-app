import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div id="landingPage">
      <section className="center">
        <h1>Welcome to EZ Flex Planner</h1>
        <h2>
          We make planning you day easier by providing the flexibility you need.
        </h2>
      </section>
      <section className="row">
        <div className="col m8 offset-m2 s12 center">
          <Link to="/login" className="btn-flat btn-large login-btn">
            Log In
          </Link>
          <Link to="/signup" className="btn-flat btn-large signup-btn">
            Sign Up
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
