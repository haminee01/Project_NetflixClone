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

const fetchRelatedMovies = ({
  id,
}: {
  id: string | number;
}): Promise<AxiosResponse<IRelatedMoviesResponse>> => {
  return api.get<IRelatedMoviesResponse>(`/movie/${id}/similar`);
};

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
