import React from 'react';

const Landing = () => {
  return (
    <div>
      <h1>Schedulizer</h1>
      <a href="/auth/google">Login With Google__</a>
      <a href="/auth/facebook">Login With Facebook__</a>
      <a href="/api/logout">Logout__</a>
      <a href="/api/current_user">Current User</a>
    </div>
  );
};

export default Landing;
