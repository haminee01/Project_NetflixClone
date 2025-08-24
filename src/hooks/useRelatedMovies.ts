import { useQuery, UseQueryResult } from "@tanstack/react-query";
import api from "../utils/api";
import { AxiosResponse } from "axios";

// 💡 개별 영화 객체에 대한 인터페이스
// 관련 영화 목록 UI에 필요한 필드들을 정의합니다.
// 보통 id, title, poster_path 등이 사용됩니다.
interface IMovie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
}

// 💡 관련 영화 API 응답 전체에 대한 인터페이스
interface IRelatedMoviesResponse {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

/**
 * 관련 영화 목록을 가져오는 비동기 함수입니다.
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
 * React Query를 사용하여 관련 영화 목록을 불러오는 커스텀 훅입니다.
 * @param id 영화 ID
 * @returns 관련 영화 목록 쿼리 결과
 */
export const useRelatedMovieQuery = ({
  id,
}: {
  id: string | number;
}): UseQueryResult<IRelatedMoviesResponse, Error> => {
  // `useQuery` 제네릭 타입을 명확하게 지정합니다.
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
