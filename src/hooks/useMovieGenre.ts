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

const fetchMovieGenre = (): Promise<AxiosResponse<IGenreList>> => {
  return api.get<IGenreList>(`/genre/movie/list`);
};

export const useMovieGenreQuery = (): UseQueryResult<IGenre[], Error> => {
  return useQuery<AxiosResponse<IGenreList>, Error, IGenre[]>({
    queryKey: ["movie-genre"],
    queryFn: fetchMovieGenre,
    select: (result) => result.data.genres,
    staleTime: 300000,
  });
};
