import { useQuery, UseQueryResult } from "@tanstack/react-query";
import api from "../utils/api";
import { AxiosResponse } from "axios";
import { IMovie } from "../types/IMovie";

interface IPopularMoviesResponse {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

/**
 * 인기 영화 목록을 가져오는 비동기 함수
 * @returns 인기 영화 데이터를 포함하는 Promise<AxiosResponse>
 */
const fetchPopularMovies = (): Promise<
  AxiosResponse<IPopularMoviesResponse>
> => {
  return api.get<IPopularMoviesResponse>(`/movie/popular`);
};

/**
 * React Query를 사용하여 인기 영화 목록을 불러오는 커스텀 훅
 * @returns 인기 영화 목록 쿼리 결과
 */
export const usePopularMoviesQuery = (): UseQueryResult<
  IPopularMoviesResponse,
  Error
> => {
  return useQuery<
    IPopularMoviesResponse, // TQueryFnData: fetchPopularMovies의 반환 데이터 타입
    Error,
    IPopularMoviesResponse // TData: select를 통해 변환된 최종 데이터 타입
  >({
    queryKey: ["movie-popular"],
    queryFn: async () => {
      const response = await fetchPopularMovies();
      return response.data;
    },
  });
};
