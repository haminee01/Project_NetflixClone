import { useQuery, UseQueryResult } from "@tanstack/react-query";
import api from "../utils/api";
import { AxiosResponse } from "axios";
import { IMovie } from "../types/IMovie";

interface ISearchMoviesResponse {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

// 훅에 전달되는 매개변수 객체에 대한 인터페이스
interface ISearchMoviesQueryProps {
  keyword: string | null;
  page: number;
  sort: string | null;
  genre: string | null;
}

/**
 * 영화를 검색하거나 탐색하는 비동기 함수
 * @param keyword 검색어
 * @param page 페이지 번호
 * @param sort 정렬 기준
 * @param genre 장르 ID
 * @returns 검색 결과를 포함하는 Promise<AxiosResponse>
 */
const fetchSearchMovie = ({
  keyword,
  page,
  sort,
  genre,
}: ISearchMoviesQueryProps): Promise<AxiosResponse<ISearchMoviesResponse>> => {
  let url: string;
  const params: Record<string, any> = { page };

  if (keyword) {
    url = `/search/movie`;
    params.query = keyword;
  } else {
    url = `/discover/movie`;
  }

  if (sort) {
    params.sort_by = sort;
  }

  if (genre) {
    params.with_genres = genre;
  }

  // Axios가 자동으로 URL 인코딩을 처리하도록 params 객체를 사용합니다.
  return api.get<ISearchMoviesResponse>(url, { params });
};

/**
 * React Query를 사용하여 영화를 검색하는 커스텀 훅
 * @param props 검색 매개변수 객체
 * @returns 검색 결과 쿼리
 */
export const useSearchMovieQuery = ({
  keyword,
  page,
  sort,
  genre,
}: ISearchMoviesQueryProps): UseQueryResult<ISearchMoviesResponse, Error> => {
  return useQuery<
    AxiosResponse<ISearchMoviesResponse>,
    Error,
    ISearchMoviesResponse
  >({
    queryKey: ["movie-search", { keyword, page, sort, genre }],
    queryFn: () => fetchSearchMovie({ keyword, page, sort, genre }),
    select: (result) => result.data,
  });
};
