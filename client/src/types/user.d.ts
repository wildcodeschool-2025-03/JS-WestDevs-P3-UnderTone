type UserProfileDatas = {
  id: number;
  name: string;
  age: number;
  signup_date: Date;
  profile_picture: string;
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
