type User = {
  id: number;
  username: string;
  status: "artist" | "concert_place" | "user" | "admin";
};

type AuthContextType = {
  isLogged: boolean;
  setIsLogged: (value: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
};

type UserData = {
  infos: string;
  result: User;
};
