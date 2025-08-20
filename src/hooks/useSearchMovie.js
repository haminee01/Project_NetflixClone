import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = ({ keyword, page, sort, genre }) => {
  let url = keyword
    ? `/search/movie?query=${keyword}&page=${page}`
    : `/discover/movie?page=${page}`;

  if (sort) {
    url += `&sort_by=${sort}`;
  }

  if (genre) {
    url += `&with_genres=${genre}`;
  }

  return api.get(url);
};

export const useSearchMovieQuery = ({ keyword, page, sort, genre }) => {
  return useQuery({
    queryKey: ["movie-search", { keyword, page, sort, genre }],
    queryFn: () => fetchSearchMovie({ keyword, page, sort, genre }),
    select: (result) => result.data,
  });
};
