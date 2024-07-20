import React from "react";

function useJWT() {
  const refreshToken = () => {
    let refresh = localStorage.getItem("refresh");
    const axios = require("axios");
    axios
      .post("http://127.0.0.1:4000/api/token", {
        token: refresh,
      })
      .then((response) => {
        localStorage.setItem("access", JSON.stringify(response.data.access));
        localStorage.setItem("refresh", JSON.stringify(response.data.refresh));
      })
      .catch(function (error) {
        console.log("error:", error);
      });
  };

  // async function getData(email, password) {
  //   const request = new Request("http://127.0.0.1:4000/api/login", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       email,
  //       password,
  //     }),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     },
  //   });
  //   try {
  //     const response = await fetch(request);
  //     if (!response.ok) {
  //       throw new Error(`Response Status: ${response.status}`);
  //     } else {
  //       const json = await response.json();
  //       localStorage.setItem("access", JSON.stringify(json.access));
  //       localStorage.setItem("refresh", JSON.stringify(json.refresh));
  //       console.log("json", json);
  //     }
  //   } catch (error) {
  //     console.log("error:", error.message);
  //   }
  // }

  function login(email, password) {
    const axios = require("axios");
    return new Promise((resolve, reject) => {
      axios
        .post("http://127.0.0.1:4000/api/login", { email, password })
        .then((response) => console.log("response:", response));
    });
    // getData(email, password);

    // fetchPromise
    //   .then((response) => response.body)
    //   .then((body) => {
    //     const reader = body.getReader();
    //     console.log("reader:", reader);
    //     // resolve(data);
    //     // localStorage.setItem("access", JSON.stringify(data.access));
    //     // localStorage.setItem("refresh", JSON.stringify(data.refresh));
    //   })
    //   .catch((error) => {
    //     // reject(error);
    //     console.log("error:", error);
    //   });
    // });
  }

  const sendPostRequest = (url, data) => {
    const sendRequest = fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        jwt: "",
      },
    });
  };

  let refresh = localStorage.getItem("refresh");

  const logout = () => {
    const axios = require("axios");
    axios.delete("http://127.0.0.1:4000/api/logout", {
      refresh,
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
