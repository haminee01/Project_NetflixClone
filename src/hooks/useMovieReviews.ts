import { useQuery, UseQueryResult } from "@tanstack/react-query";
import api from "../utils/api";
import { AxiosResponse } from "axios";

interface IReview {
  author: string;
  content: string;
}

interface IReviewsResponse {
  results: IReview[];
  total_results: number;
}

/**
 * 특정 영화의 리뷰 목록을 가져오는 비동기 함수
 * @param id 영화 ID
 * @returns 리뷰 데이터를 포함하는 Promise<AxiosResponse>
 */
const fetchMovieReviews = ({
  id,
}: {
  id: string | number;
}): Promise<AxiosResponse<IReviewsResponse>> => {
  return api.get<IReviewsResponse>(`/movie/${id}/reviews`);
};

/**
 * React Query를 사용하여 영화 리뷰 목록을 불러오는 커스텀 훅
 * @param id 영화 ID
 * @returns 리뷰 목록 쿼리 결과
 */
export const useMovieReviewQuery = ({
  id,
}: {
  id: string | number;
}): UseQueryResult<IReviewsResponse, Error> => {
  return useQuery<AxiosResponse<IReviewsResponse>, Error, IReviewsResponse>({
    queryKey: ["movie-reviews", { id }],
    queryFn: () => fetchMovieReviews({ id }),
    select: (result) => result.data,
  });
};
