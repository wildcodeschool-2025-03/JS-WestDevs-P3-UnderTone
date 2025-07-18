interface User {
  username: string;
  birthdate: string;
  profile_picture?: string;
  email: string;
  password: string;
  status: "artist" | "concert_place" | "spectator" | "admin";
  signup_date?: string;
}
