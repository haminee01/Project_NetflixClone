import axios from "axios";

// NOTE: .env 파일 문제 임시적 우회 -> 환경 변수로 변경하기
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTQzNGE0NWI2N2MzYjJkZDU3MjM1NWU2ZjBhYTU5OSIsIm5iZiI6MTcwNzgyNjkxMC45MzUwMDAyLCJzdWIiOiI2NWNiNWVkZTViZTAwZTAxN2NhZDFmYjkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WTW0KT1G6THWGnciAGOd_kN3IvEGgyf24PsudasONKI";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

axios.interceptors.request.use(
  function (config) {
    console.log("Starting Request", config);
    return config;
  },
  function (error) {
    console.log("Request Error", error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    console.log("Getting Response", response);
    return response;
  },
  function (error) {
    console.log("Response Error", error);
    return Promise.reject(error);
  }
);

export default api;
