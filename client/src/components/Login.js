import React from 'react';

const Login = props => {
  console.log(props);
  return (
    <div>
      <button className="loginBtn loginBtn--facebook">
        {props.message} with Facebook
      </button>

      <button className="loginBtn loginBtn--google">
        {props.message} with Google
      </button>
    </div>
  );
};

export default Login;
