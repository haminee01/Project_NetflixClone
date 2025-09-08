import { useQuery, UseQueryResult } from "@tanstack/react-query";
import api from "../utils/api";
import { AxiosResponse } from "axios";
import { IReview } from "../types/IReview";

interface IReviewsResponse {
  results: IReview[];
  total_results: number;
}

const fetchMovieReviews = ({
  id,
}: {
  id: string | number;
}): Promise<AxiosResponse<IReviewsResponse>> => {
  return api.get<IReviewsResponse>(`/movie/${id}/reviews`);
};

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
