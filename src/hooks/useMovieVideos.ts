import { useQuery, UseQueryResult, QueryFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "../utils/api";
import { IVideo } from "../types/IVideo";

interface IVideosResponse {
  id: number;
  results: IVideo[];
}

type VideosQueryFn = QueryFunction<
  AxiosResponse<IVideosResponse>,
  [string, { id: number | string }]
>;

const fetchMovieVideos: VideosQueryFn = async ({ queryKey }) => {
  const [, { id }] = queryKey;
  if (!id) {
    throw new Error("Movie ID is required");
  }
  return api.get<IVideosResponse>(`/movie/${id}/videos`);
};

export const useMovieVideos = ({
  id,
}: {
  id: string | number;
}): UseQueryResult<IVideosResponse, Error> => {
  return useQuery({
    queryKey: ["movie-videos", { id }],
    queryFn: fetchMovieVideos,
    select: (result) => result.data,
    enabled: !!id,
  });
};
