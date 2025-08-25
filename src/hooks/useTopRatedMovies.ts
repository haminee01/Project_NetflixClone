import { useQuery, UseQueryResult } from "@tanstack/react-query";
import api from "../utils/api";
import { AxiosResponse } from "axios";
import { IMovie } from "../types/IMovie";

interface ITopRatedMoviesResponse {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

const fetchTopRatedMovies = (): Promise<
  AxiosResponse<ITopRatedMoviesResponse>
> => {
  return api.get<ITopRatedMoviesResponse>(`/movie/top_rated`);
};

export const useTopRatedMoviesQuery = (): UseQueryResult<
  ITopRatedMoviesResponse,
  Error
> => {
  return useQuery<
    AxiosResponse<ITopRatedMoviesResponse>,
    Error,
    ITopRatedMoviesResponse
  >({
    queryKey: ["movie-top_rated"],
    queryFn: fetchTopRatedMovies,
    select: (result) => result.data,
  });
};
