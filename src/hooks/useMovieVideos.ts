import { useQuery, UseQueryResult, QueryFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "../utils/api";
import { IVideo } from "../types/IVideo";

interface IVideosResponse {
  id: number;
  results: IVideo[];
}

// 명시적으로 QueryFunction 타입 정의
type VideosQueryFn = QueryFunction<
  AxiosResponse<IVideosResponse>,
  // QueryKey 타입을 명확히 정의
  [string, { id: number | string }]
>;

/**
 * 특정 영화의 비디오 목록을 가져오는 비동기 함수
 * @param queryFnContext React Query의 queryFn 인자 객체
 * @returns 비디오 데이터를 포함하는 Promise<AxiosResponse>
 */
const fetchMovieVideos: VideosQueryFn = async ({ queryKey }) => {
  const [, { id }] = queryKey;
  if (!id) {
    throw new Error("Movie ID is required");
  }
  return api.get<IVideosResponse>(`/movie/${id}/videos`);
};

/**
 * React Query를 사용하여 영화 비디오 목록을 불러오는 커스텀 훅
 * @param id 영화 ID
 * @returns 비디오 목록 쿼리 결과
 */
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
