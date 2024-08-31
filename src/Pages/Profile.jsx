import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Row from "../Components/Row";
import UserData from "../Components/UserData";
import LogoutButton from "../Components/LogoutButton";
import useJWT from "../Hooks/useJWT";

const Profile = () => {
  const { logout, sendPostRequest, refreshToken } = useJWT();
  const [user, setUser] = React.useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("access"));
    if (token) {
      sendPostRequest("http://127.0.0.1:4000/api/user", token)
        .then((res) => {
          const data = res.data.user;
          setUser(data);
        })
        .catch(() => {
          refreshToken().then(() => {
            sendPostRequest("http://127.0.0.1:4000/api/user", token).then(
              (res) => {
                const data = res.json().data.user;
                setUser(data);
              }
            );
          });
        });
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="container">
      <Row>
        <UserData label="Name">{user.name}</UserData>
        <UserData label="Family">{user.lastname}</UserData>
      </Row>

      <Row>
        <UserData label="Phone">{user.phone}</UserData>
        <UserData label="Address">{user.address}</UserData>
      </Row>

      <Row>
        <UserData label="Email">{user.email}</UserData>
        <UserData label="Password">{user.password}</UserData>
      </Row>

      <LogoutButton
        onClick={() => {
          logout();
        }}
      />
    </div>
  );
};

export default Profile;
