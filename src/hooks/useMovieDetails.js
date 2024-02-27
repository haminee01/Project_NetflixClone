import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieDetails = ({ id }) => {
  return api.get(`/movie/${id}`);
};

export const useMovieDetailQuery = ({ id }) => {
  return useQuery({
    queryKey: ["movie-details", { id }],
    queryFn: () => fetchMovieDetails({ id }),
    select: (result) => result.data,
  });
};
