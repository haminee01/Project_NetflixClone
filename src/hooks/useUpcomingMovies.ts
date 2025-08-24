import { useQuery, UseQueryResult } from "@tanstack/react-query";
import api from "../utils/api";
import { AxiosResponse } from "axios";

interface IUpcomingDates {
  maximum: string;
  minimum: string;
}

interface IMovie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

interface IUpcomingMoviesResponse {
  dates: IUpcomingDates;
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

/**
 * 개봉 예정 영화 목록을 가져오는 비동기 함수
 * @returns 개봉 예정 영화 데이터를 포함하는 Promise<AxiosResponse>
 */
const fetchUpcomingMovies = (): Promise<
  AxiosResponse<IUpcomingMoviesResponse>
> => {
  return api.get<IUpcomingMoviesResponse>(`/movie/upcoming`);
};

/**
 * React Query를 사용하여 개봉 예정 영화 목록을 불러오는 커스텀 훅
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
