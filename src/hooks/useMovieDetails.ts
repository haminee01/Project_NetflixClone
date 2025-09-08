import { useQuery, UseQueryResult } from "@tanstack/react-query";
import api from "../utils/api";
import { AxiosResponse } from "axios";

export interface IMovieDetails {
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
  popularity: number;
}

const fetchMovieDetails = ({
  id,
}: {
  id: string | number;
}): Promise<AxiosResponse<IMovieDetails>> => {
  return api.get<IMovieDetails>(`/movie/${id}`);
};

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
