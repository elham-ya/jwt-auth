import React, { useState } from "react";
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
  const { login } = useJWT();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email && password) {
      login(email, password).then(() => {
        navigate("/");
      });
    }
  };
  const [disable, setDisable] = useState(true);
  const handleDisabledButton = (e) => {
    if (e) {
      setDisable(false);
    } else setDisable(true);
  };

  return (
    <Card>
      <h3>Login</h3>
      <Input
        data-testid="email"
        label="✉️ Email"
        type="email"
        defaultValue={email}
        onBlur={(event) => setEmail(event.target.value)}
        autoFocus
        tabIndex="1"
        pattern=".+@example\.com"
      />
      <Input
        data-testid="password"
        label="🔑 Password"
        type="password"
        defaultValue={password}
        onBlur={(e) => {
          setPassword(e.target.value);
        }}
        tabIndex="2"
        onChange={handleDisabledButton}
      />

      <NotRobot checked={false} onChange={() => {}} />
      <ErrorMessage />

      <LoginButton type="button" onClick={handleLogin} disabled={disable} />
    </Card>
  );
};

export default Login;
