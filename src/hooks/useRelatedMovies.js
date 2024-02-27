import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchRelatedMovies = ({ id }) => {
  return api.get(`/movie/${id}/similar`);
};

export const useRelatedMovieQuery = ({ id }) => {
  return useQuery({
    queryKey: ["related-movie", { id }],
    queryFn: () => fetchRelatedMovies({ id }),
    select: (result) => result.data,
  });
};
