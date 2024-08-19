import React from "react";
import { useNavigate } from "react-router-dom";

function useJWT() {
  const navigate = useNavigate();
  const refreshToken = () => {
    let refresh = localStorage.getItem("refresh");
    const axios = require("axios");
    return new Promise((resolve, reject) => {
      axios
        .post("http://127.0.0.1:4000/api/token", {
          token: refresh,
        })
        .then((response) => {
          localStorage.setItem("access", JSON.stringify(response.data.access));
          localStorage.setItem(
            "refresh",
            JSON.stringify(response.data.refresh)
          );
        })
        .catch(function (error) {
          console.log("error:", error);
        });
    });
  };

  function login(email, password) {
    const axios = require("axios");
    return new Promise((resolve, reject) => {
      axios.post("http://127.0.0.1:4000/api/login", { email, password }).then(
        (response) => {
          localStorage.setItem("access", JSON.stringify(response.data.access));
          localStorage.setItem(
            "refresh",
            JSON.stringify(response.data.refresh)
          );
          navigate("/");
          resolve();
        },
        function (error) {
          console.log("error:", error);
          reject();
        }
      );
    });
  }

  const sendPostRequest = (url, data) => {
    let access = localStorage.getItem("access");
    const sendRequest = fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        jwt: access,
      },
    });
  };

  let refresh = localStorage.getItem("refresh");

  const logout = () => {
    const axios = require("axios");
    axios
      .delete("http://127.0.0.1:4000/api/logout", {
        refresh,
      })
      .then(() => {
        navigate("/login");
      });

    localStorage.clear();
  };

  return {
    login,
    logout,
    refreshToken,
    sendPostRequest,
  };
}

export default useJWT;
