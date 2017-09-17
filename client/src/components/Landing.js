import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div>
      <h1>Welcome to Schedulizer</h1>
      <Link to="/login" className="btn-flat grey">
        Log In
      </Link>
      <Link to="/signup" className="btn-flat grey">
        Sign Up
      </Link>
    </div>
  );
};

export default Landing;
