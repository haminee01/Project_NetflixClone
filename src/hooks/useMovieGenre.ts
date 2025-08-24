import { useQuery, UseQueryResult } from "@tanstack/react-query";
import api from "../utils/api";
import { AxiosResponse } from "axios";

interface IGenre {
  id: number;
  name: string;
}

interface IGenreList {
  genres: IGenre[];
}

/**
 * 영화 장르 목록을 가져오는 비동기 함수
 * @returns 장르 목록 데이터를 포함하는 Promise<AxiosResponse>
 */
const fetchMovieGenre = (): Promise<AxiosResponse<IGenreList>> => {
  return api.get<IGenreList>(`/genre/movie/list`);
};

/**
 * React Query를 사용하여 영화 장르 목록을 불러오는 커스텀 훅
 * @returns 장르 목록 쿼리 결과
 */
export const useMovieGenreQuery = (): UseQueryResult<IGenre[], Error> => {
  return useQuery<AxiosResponse<IGenreList>, Error, IGenre[]>({
    queryKey: ["movie-genre"],
    queryFn: fetchMovieGenre,
    select: (result) => result.data.genres,
    staleTime: 300000, // 5분
  });
};
