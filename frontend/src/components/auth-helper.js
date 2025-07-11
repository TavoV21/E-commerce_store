import React from "react";
import Axios from "axios";

let tokenkey = "";
export function receiveToken(token) {
  tokenkey = token;
}

export function showToken() {
  return tokenkey;
}

export function initAxiosInterceptors() {
  Axios.interceptors.request.use(function (config) {
    const token = showToken();

    if (token) {
      config.headers["x-access-token"] = token;
    }

    return config;
  });

  Axios.interceptors.response.use(function (response) {
    console.log(response);
    return response;
  });
}
