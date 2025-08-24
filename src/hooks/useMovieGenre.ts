import { useQuery, UseQueryResult } from "@tanstack/react-query";
import api from "../utils/api";
import { AxiosResponse } from "axios";

// 💡 영화 장르 데이터 구조에 대한 인터페이스를 정의합니다.
interface IGenre {
  id: number;
  name: string;
}

// 💡 장르 목록 API 응답에 대한 인터페이스를 정의합니다.
// 이 응답은 `genres` 배열을 포함하고 있습니다.
interface IGenreList {
  genres: IGenre[];
}

/**
 * 영화 장르 목록을 가져오는 비동기 함수입니다.
 * @returns 장르 목록 데이터를 포함하는 Promise<AxiosResponse>
 */
const fetchMovieGenre = (): Promise<AxiosResponse<IGenreList>> => {
  // `AxiosResponse<IGenreList>`를 반환하도록 타입을 명시하여,
  // `data` 속성의 타입이 `IGenreList`임을 보장합니다.
  return api.get<IGenreList>(`/genre/movie/list`);
};

/**
 * React Query를 사용하여 영화 장르 목록을 불러오는 커스텀 훅입니다.
 * @returns 장르 목록 쿼리 결과
 */
export const useMovieGenreQuery = (): UseQueryResult<IGenre[], Error> => {
  // `useQuery`의 제네릭 타입을 명확하게 지정합니다.
  // 첫 번째 제네릭: `queryFn`의 반환 타입 (`AxiosResponse<IGenreList>`)
  // 두 번째 제네릭: 에러 타입 (`Error`)
  // 세 번째 제네릭: `select` 이후 최종 데이터 타입 (`IGenre[]`)
  return useQuery<AxiosResponse<IGenreList>, Error, IGenre[]>({
    queryKey: ["movie-genre"],
    queryFn: fetchMovieGenre,
    select: (result) => result.data.genres, // `data` 속성에서 `genres` 배열을 선택
    staleTime: 300000, // 5분
  });
};
