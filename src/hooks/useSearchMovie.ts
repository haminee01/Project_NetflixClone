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

interface ISearchMoviesQueryProps {
  keyword: string | null;
  page: number;
  sort: string | null;
  genre: string | null;
}

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

  return api.get<ISearchMoviesResponse>(url, { params });
};

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
