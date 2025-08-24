import { useQuery, UseQueryResult } from "@tanstack/react-query";
import api from "../utils/api";
import { AxiosResponse } from "axios";

interface IMovie {
  id: number;
  title: string;
  poster_path: string | null;
}

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
    AxiosResponse<IPopularMoviesResponse>,
    Error,
    IPopularMoviesResponse
  >({
    queryKey: ["movie-popular"],
    queryFn: fetchPopularMovies,
    select: (result) => result.data,
  });
};
