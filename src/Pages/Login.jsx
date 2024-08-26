import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Components/Card";
import Input from "../Components/Input";
import NotRobot from "../Components/NotRobot";
import LoginButton from "../Components/LoginButtons";
import ErrorMessage from "../Components/ErrorMessage";
import useJWT from "../Hooks/useJWT";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [flag, setFlag] = useState(false);
  const [disable, setDisable] = useState({
    userName: true,
    password: true,
  });
  const { login } = useJWT();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email && password && checked) {
      login(email, password)
        .then(() => {
          navigate("/");
        })
        .catch(() => {
          console.log("catch:");
          setFlag(true);
          setPassword("");
        });
    }
  };
  console.log("flag in public:", flag);
  

  const handleChangeUserNameInput = (e) => {
    if (e && e.target.value && e.target.value.trim().length !== 0) {
      setDisable((prev) => ({ ...prev, userName: false }));
    } else {
      setDisable((prev) => ({ ...prev, userName: true }));
    }
  };

  const handleChangeUserPassword = (e) => {
    if (e && e.target.value && e.target.value.trim().length !== 0) {
      setDisable((prev) => ({ ...prev, password: false }));
    } else {
      setDisable((prev) => ({ ...prev, password: true }));
    }
  };

  const handleButtonDisable = () => {
    if (checked) {
      if (disable.userName && disable.password) {
        return true;
      } else if (disable.userName && !disable.password) {
        return true;
      } else if (!disable.userName && disable.password) {
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

  useEffect(() => {
    console.log("flag:", flag);
    if (flag) {
      console.log("asasa");
      setPassword("");
    }
    console.log("password:", password);
  }, [flag]);

  return (
    <Card>
      <h3>Login</h3>
      <Input
        data-testid="email"
        label="✉️ Email"
        type="email"
        defaultValue={email}
        onBlur={(event) => {
          setEmail(event.target.value);
        }}
        autoFocus
        tabIndex="1"
        pattern=".+@example\.com"
        onChange={handleChangeUserNameInput}
      />
      <Input
        data-testid="password"
        label="🔑 Password"
        type="password"
        // value
        defaultValue={password}
        onBlur={(e) => {
          setPassword(e.target.value);
        }}
        tabIndex="2"
        onChange={handleChangeUserPassword}
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
