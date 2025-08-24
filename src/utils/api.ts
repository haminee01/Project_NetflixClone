import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// NOTE: 환경 변수에서 불러오는 방식으로 변환
const API_TOKEN: string =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTQzNGE0NWI2N2MzYjJkZDU3MjM1NWU2ZjBhYTU5OSIsIm5iZiI6MTcwNzgyNjkxMC45MzUwMDAyLCJzdWIiOiI2NWNiNWVkZTViZTAwZTAxN2NhZDFmYjkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WTW0KT1G6THWGnciAGOd_kN3IvEGgyf24PsudasONKI";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

// 요청 인터셉터
// AxiosRequestConfig 대신 InternalAxiosRequestConfig
api.interceptors.request.use(
  function (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    console.log("Starting Request", config);
    return config;
  },
  function (error: any): Promise<any> {
    console.log("Request Error", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  function (response: AxiosResponse): AxiosResponse {
    console.log("Getting Response", response);
    return response;
  },
  function (error: any): Promise<any> {
    console.log("Response Error", error);
    return Promise.reject(error);
  }
);

export default api;
