import React from 'react';

const Login = props => {
  console.log(props);
  return (
    <div className="center-align" id="loginBox">
      <h3>
        Currently to use EZ Flex Planner, you must connect with Facebook or
        Google
      </h3>
      <div>
        <a className="loginBtn loginBtn--facebook" href="/auth/facebook">
          {props.message} with Facebook
        </a>
      </div>
      <div>
        <a className="loginBtn loginBtn--google" href="/auth/google">
          {props.message} with Google
        </a>
      </div>
    </div>
  );
};

export default Login;
