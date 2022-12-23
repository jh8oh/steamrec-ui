export interface FullRating {
  developerRatings: Rating[];
  publisherRatings: Rating[];
  tagRatings: Rating[];
  genreRatings: Rating[];
  categoryRatings: Rating[];
}

interface Rating {
  name: string;
  rating: number;
}
