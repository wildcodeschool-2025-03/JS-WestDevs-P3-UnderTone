type UserProfileDatas = {
  id: number;
  name: string;
  age: number | null;
  signup_date: Date;
  profile_picture: string | null;
};

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
