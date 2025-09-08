import { useQuery, UseQueryResult } from "@tanstack/react-query";
import api from "../utils/api";
import { AxiosResponse } from "axios";
import { IMovie } from "../types/IMovie";

interface IUpcomingDates {
  maximum: string;
  minimum: string;
}

interface IUpcomingMoviesResponse {
  dates: IUpcomingDates;
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

const fetchUpcomingMovies = (): Promise<
  AxiosResponse<IUpcomingMoviesResponse>
> => {
  return api.get<IUpcomingMoviesResponse>(`/movie/upcoming`);
};

export const useUpcomingMoviesQuery = (): UseQueryResult<
  IUpcomingMoviesResponse,
  Error
> => {
  return useQuery<
    AxiosResponse<IUpcomingMoviesResponse>,
    Error,
    IUpcomingMoviesResponse
  >({
    queryKey: ["movie-upcoming"],
    queryFn: fetchUpcomingMovies,
    select: (result) => result.data,
  });
};
