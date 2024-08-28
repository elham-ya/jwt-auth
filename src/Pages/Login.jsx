import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Components/Card";
import Input from "../Components/Input";
import NotRobot from "../Components/NotRobot";
import LoginButton from "../Components/LoginButtons";
import ErrorMessage from "../Components/ErrorMessage";
import useJWT from "../Hooks/useJWT";

const Login = () => {
  const { login } = useJWT();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    userName: "",
    userPassword: "",
  });
  const [disable, setDisable] = useState({
    userName: true,
    userPassword: true,
  });
  const [checked, setChecked] = useState(false);
  const [flag, setFlag] = useState(false);

  const handleLogin = () => {
    if (input.userName && input.userPassword && checked) {
      login(input.userName, input.userPassword)
        .then(() => {
          navigate("/");
        })
        .catch(() => {
          setFlag(true);
          setInput((prev) => ({
            ...prev,
            userPassword: "",
          }));
          setDisable((prev) => ({ ...prev, userPassword: true }));
        });
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (e && value && value.trim().length !== 0) {
      setDisable((prev) => ({ ...prev, [name]: false }));
    } else {
      setDisable((prev) => ({ ...prev, [name]: true }));
    }
  };

  const handleButtonDisable = () => {
    if (checked) {
      if (disable.userName || disable.userPassword) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };


  const handleNoRobotCheck = (event) => {
    setChecked(event.target.checked);
  };
  console.log("disable:", disable);
  return (
    <Card>
      <h3>Login</h3>
      <Input
        name="userName"
        data-testid="email"
        label="✉️ Email"
        type="email"
        defaultValue={input.userName}
        // onBlur={(event) => {
        //   setEmail(event.target.value);
        // }}
        autoFocus
        tabIndex="1"
        pattern=".+@example\.com"
        onChange={handleChangeInput}
      />
      <Input
        name="userPassword"
        data-testid="password"
        label="🔑 Password"
        type="password"
        value={input.userPassword}
        // onBlur={(e) => {
        //   setPassword(e.target.value);
        // }}
        tabIndex="2"
        onChange={handleChangeInput}
      />

      <NotRobot checked={checked} onChange={handleNoRobotCheck} />
      {flag && <ErrorMessage />}

      <LoginButton
        type="button"
        onClick={handleLogin}
        disabled={handleButtonDisable()}
      />
    </Card>
  );
};

export default Login;
