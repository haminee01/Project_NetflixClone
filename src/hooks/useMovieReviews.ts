import { useQuery, UseQueryResult } from "@tanstack/react-query";
import api from "../utils/api";
import { AxiosResponse } from "axios";

// 💡 개별 리뷰 객체에 대한 인터페이스
// UI에 필요한 'author'와 'content'만 포함합니다.
interface IReview {
  author: string;
  content: string;
}

// 💡 리뷰 API 응답 전체에 대한 인터페이스
// 필요한 필드인 'results'와 'total_results'만 남겨둡니다.
interface IReviewsResponse {
  results: IReview[];
  total_results: number;
}

/**
 * 특정 영화의 리뷰 목록을 가져오는 비동기 함수입니다.
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
 * React Query를 사용하여 영화 리뷰 목록을 불러오는 커스텀 훅입니다.
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
