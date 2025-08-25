export interface IMovie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  genre_ids: number[];
  vote_average: number;
  popularity: number;
  adult: boolean;
  overview?: string;
}
