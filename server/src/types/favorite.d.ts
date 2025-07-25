type FavoritesByType = {
  id: number;
  name: string;
  profile_picture: string;
}[];

type UserProfileFavoriteEvent = {
  id: number;
  name: string;
  date: Date;
  hour: string;
  image: string;
  concert_place: string;
  artistList: {
    id: number;
    name: string;
  }[];
};
