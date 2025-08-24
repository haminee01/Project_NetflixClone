import { useQuery, UseQueryResult } from "@tanstack/react-query";
import api from "../utils/api";
import { AxiosResponse } from "axios";

interface IMovieDetails {
  id: number;
  title: string;
  original_title: string;
  tagline: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  adult: boolean;
  homepage: string | null;
  status: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  release_date: string;
  genres: {
    id: number;
    name: string;
  }[];
  belongs_to_collection: object | null;
  budget: number;
  revenue: number;
}

/**
 * 영화 상세 정보를 가져오는 비동기 함수
 * @param id 영화 ID
 * @returns 영화 상세 정보 데이터를 포함하는 Promise<AxiosResponse>
 */
const fetchMovieDetails = ({
  id,
}: {
  id: string | number;
}): Promise<AxiosResponse<IMovieDetails>> => {
  return api.get<IMovieDetails>(`/movie/${id}`);
};

/**
 * React Query를 사용하여 영화 상세 정보를 불러오는 커스텀 훅
 * @param id 영화 ID
 * @returns 영화 상세 정보 쿼리 결과
 */
export const useMovieDetailQuery = ({
  id,
}: {
  id: string | number;
}): UseQueryResult<IMovieDetails, Error> => {
  return useQuery<AxiosResponse<IMovieDetails>, Error, IMovieDetails>({
    queryKey: ["movie-details", { id }],
    queryFn: () => fetchMovieDetails({ id }),
    select: (result) => result.data,
  });
};
