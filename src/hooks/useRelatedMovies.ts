import { useQuery, UseQueryResult } from "@tanstack/react-query";
import api from "../utils/api";
import { AxiosResponse } from "axios";
import { IMovie } from "../types/IMovie";

interface IRelatedMoviesResponse {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

/**
 * 관련 영화 목록을 가져오는 비동기 함수
 * @param id 영화 ID
 * @returns 관련 영화 데이터를 포함하는 Promise<AxiosResponse>
 */
const fetchRelatedMovies = ({
  id,
}: {
  id: string | number;
}): Promise<AxiosResponse<IRelatedMoviesResponse>> => {
  return api.get<IRelatedMoviesResponse>(`/movie/${id}/similar`);
};

/**
 * React Query를 사용하여 관련 영화 목록을 불러오는 커스텀 훅
 * @param id 영화 ID
 * @returns 관련 영화 목록 쿼리 결과
 */
export const useRelatedMovieQuery = ({
  id,
}: {
  id: string | number;
}): UseQueryResult<IRelatedMoviesResponse, Error> => {
  return useQuery<
    AxiosResponse<IRelatedMoviesResponse>,
    Error,
    IRelatedMoviesResponse
  >({
    queryKey: ["related-movie", { id }],
    queryFn: () => fetchRelatedMovies({ id }),
    select: (result) => result.data,
  });
};
