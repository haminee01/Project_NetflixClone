import { useQuery, UseQueryResult } from "@tanstack/react-query";
import api from "../utils/api";
import { AxiosResponse } from "axios";

// 💡 영화 상세 정보 API 응답에 대한 인터페이스를 정의합니다.
// 실제 API 응답 구조에 맞게 필드를 추가하거나 수정해야 합니다.
// 영화 상세 정보에 대한 인터페이스
interface IMovieDetails {
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
}

/**
 * 영화 상세 정보를 가져오는 비동기 함수입니다.
 * @param id 영화 ID
 * @returns 영화 상세 정보 데이터를 포함하는 Promise<AxiosResponse>
 */
const fetchMovieDetails = ({
  id,
}: {
  id: string | number;
}): Promise<AxiosResponse<IMovieDetails>> => {
  // `AxiosResponse<IMovieDetails>`를 반환하도록 타입을 명시하여,
  // `data` 속성의 타입이 `IMovieDetails`임을 보장합니다.
  return api.get<IMovieDetails>(`/movie/${id}`);
};

/**
 * React Query를 사용하여 영화 상세 정보를 불러오는 커스텀 훅입니다.
 * @param id 영화 ID
 * @returns 영화 상세 정보 쿼리 결과
 */
export const useMovieDetailQuery = ({
  id,
}: {
  id: string | number;
}): UseQueryResult<IMovieDetails, Error> => {
  // `useQuery`의 첫 번째 제네릭 타입은 `queryFn`의 반환 타입이고,
  // 두 번째 제네릭 타입은 `select`가 적용된 최종 데이터 타입입니다.
  // 이 경우, `queryFn`의 반환 타입은 `AxiosResponse<IMovieDetails>`이고,
  // `select`를 통해 최종적으로 `IMovieDetails`를 반환하므로,
  // UseQueryResult<IMovieDetails, Error>로 충분합니다.

  // 에러 메시지에서 `TQueryFnData`가 `IMovieDetails`에 할당될 수 없다는 내용은
  // `useQuery` 내부의 타입 추론 과정에서 발생하는 호환성 문제일 가능성이 높습니다.
  // 이 문제를 해결하기 위해 `useQuery`의 제네릭을 명확하게 지정해줍니다.
  return useQuery<AxiosResponse<IMovieDetails>, Error, IMovieDetails>({
    queryKey: ["movie-details", { id }],
    queryFn: () => fetchMovieDetails({ id }),
    select: (result) => result.data,
  });
};
