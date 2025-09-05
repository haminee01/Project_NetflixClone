// import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

// const TMDB_API_KEY: string = "";

// const api = axios.create({
//   baseURL: "https://api.themoviedb.org/3",
//   params: {
//     api_key: TMDB_API_KEY,
//     language: "en-US",
//   },
// });

// // 요청 인터셉터
// api.interceptors.request.use(
//   function (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
//     console.log("Starting Request", config);
//     return config;
//   },
//   function (error: any): Promise<any> {
//     console.log("Request Error", error);
//     return Promise.reject(error);
//   }
// );

// // 응답 인터셉터
// api.interceptors.response.use(
//   function (response: AxiosResponse): AxiosResponse {
//     console.log("Getting Response", response);
//     return response;
//   },
//   function (error: any): Promise<any> {
//     console.log("Response Error", error);
//     return Promise.reject(error);
//   }
// );

// export default api;


// .env 환경변수
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const TMDB_API_KEY: string | undefined = import.meta.env.VITE_TMDB_API_KEY;

if (!TMDB_API_KEY) {
  console.error("TMDB API Key is missing. Please check your .env file.");
}

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: TMDB_API_KEY || '',
    language: "en-US",
  },
});

// 요청 인터셉터
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
