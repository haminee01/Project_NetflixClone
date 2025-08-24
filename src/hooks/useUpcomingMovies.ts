import { useQuery, UseQueryResult } from "@tanstack/react-query";
import api from "../utils/api";
import { AxiosResponse } from "axios";

// 💡 개봉 예정 영화 API의 'dates' 객체에 대한 인터페이스입니다.
interface IUpcomingDates {
  maximum: string;
  minimum: string;
}

// 💡 개별 영화 객체에 대한 인터페이스
// UI에 필요한 'id', 'title', 'poster_path'만 포함합니다.
interface IMovie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

// 💡 개봉 예정 영화 API 응답 전체에 대한 인터페이스
interface IUpcomingMoviesResponse {
  dates: IUpcomingDates;
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

/**
 * 개봉 예정 영화 목록을 가져오는 비동기 함수입니다.
 * @returns 개봉 예정 영화 데이터를 포함하는 Promise<AxiosResponse>
 */
const fetchUpcomingMovies = (): Promise<
  AxiosResponse<IUpcomingMoviesResponse>
> => {
  return api.get<IUpcomingMoviesResponse>(`/movie/upcoming`);
};

/**
 * React Query를 사용하여 개봉 예정 영화 목록을 불러오는 커스텀 훅입니다.
 * @returns 개봉 예정 영화 목록 쿼리 결과
 */
export const useUpcomingMoviesQuery = (): UseQueryResult<
  IUpcomingMoviesResponse,
  Error
> => {
  return useQuery<
    AxiosResponse<IUpcomingMoviesResponse>,
    Error,
    IUpcomingMoviesResponse
  >({
    queryKey: ["movie-upcoming"],
    queryFn: fetchUpcomingMovies,
    select: (result) => result.data,
  });
};
