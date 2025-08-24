import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// NOTE: 환경 변수에서 불러오는 방식으로 변환
const API_TOKEN: string =
  "// 토큰 ";

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
