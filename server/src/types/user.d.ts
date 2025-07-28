type User = {
  username: string;
  birthdate: string;
  profile_picture?: string;
  email: string;
  password: string;
  status: "artist" | "concert_place" | "user" | "admin";
  signup_date?: string;
};

type UserProfileDatas = {
  id: number;
  name: string;
  profile_picture: string | null;
  age: number | null;
  signup_date: Date;
};
