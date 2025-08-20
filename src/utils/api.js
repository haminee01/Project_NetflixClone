import axios from "axios";

// NOTE: .env 파일 문제를 우회하기 위해 토큰을 직접 코드에 입력합니다.
//       이 방법은 보안상 좋지 않으므로, 프로젝트 배포 시에는 반드시 환경 변수로 변경해야 합니다.
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTQzNGE0NWI2N2MzYjJkZDU3MjM1NWU2ZjBhYTU5OSIsIm5iZiI6MTcwNzgyNjkxMC45MzUwMDAyLCJzdWIiOiI2NWNiNWVkZTViZTAwZTAxN2NhZDFmYjkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WTW0KT1G6THWGnciAGOd_kN3IvEGgyf24PsudasONKI";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

// 요청 인터셉터 추가
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

// 응답 인터셉터 추가
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
