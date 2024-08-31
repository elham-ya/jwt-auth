import { useNavigate } from "react-router-dom";

function useJWT() {
  const navigate = useNavigate();

  const refreshToken = () => {
    const url = "http://127.0.0.1:4000/api/token";
    const refresh = localStorage.getItem("refresh");
    const axios = require("axios");
    return new Promise((resolve, reject) => {
      axios
        .post(url, {
          token: refresh,
        })
        .then((response) => {
          localStorage.setItem("access", JSON.stringify(response.data.access));
          localStorage.setItem(
            "refresh",
            JSON.stringify(response.data.refresh)
          );
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  function login(email, password) {
    const url = "http://127.0.0.1:4000/api/login";
    const axios = require("axios");
    return new Promise((resolve, reject) => {
      axios.post(url, { email, password }).then(
        (response) => {
          localStorage.setItem("access", JSON.stringify(response.data.access));
          localStorage.setItem(
            "refresh",
            JSON.stringify(response.data.refresh)
          );
          resolve(response);
        },
        function (error) {
          reject(error);
        }
      );
    });
  }

  const sendPostRequest = (url, accessToken) => {
    const axios = require("axios");
    return new Promise((resolve, reject) => {
      axios
        .post(
          url,
          { access: accessToken },
          {
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
              jwt: accessToken,
            },
          }
        )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const logout = () => {
    const url = "http://127.0.0.1:4000/api/logout";
    const axios = require("axios");
    const refresh = localStorage.getItem("refresh");
    return new Promise((resolve, reject) => {
      axios
        .delete(url, {
          refresh,
        })
        .then(() => {
          navigate("/login");
          resolve();
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          localStorage.clear();
        });
    });
  };

  return {
    login,
    logout,
    refreshToken,
    sendPostRequest,
  };
}

export default useJWT;
