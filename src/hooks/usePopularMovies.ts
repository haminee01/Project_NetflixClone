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

const fetchPopularMovies = (): Promise<
  AxiosResponse<IPopularMoviesResponse>
> => {
  return api.get<IPopularMoviesResponse>(`/movie/popular`);
};

export const usePopularMoviesQuery = (): UseQueryResult<
  IPopularMoviesResponse,
  Error
> => {
  return useQuery<IPopularMoviesResponse, Error, IPopularMoviesResponse>({
    queryKey: ["movie-popular"],
    queryFn: async () => {
      const response = await fetchPopularMovies();
      return response.data;
    },
  });
};
