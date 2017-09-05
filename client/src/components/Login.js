import React from 'react';

const Login = props => {
  console.log(props);
  return (
    <div>
      <a className="loginBtn loginBtn--facebook" href="/auth/facebook">
        {props.message} with Facebook
      </a>

      <a className="loginBtn loginBtn--google" href="/auth/google">
        {props.message} with Google
      </a>
    </div>
  );
};

export default Login;
