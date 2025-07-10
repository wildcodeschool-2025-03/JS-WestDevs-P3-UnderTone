export interface User {
  id: number;
  username: string;
  email: string;
  status: "artist" | "concert_place" | "user" | "admin";
}

export interface AuthContextType {
  isLogged: boolean;
  setIsLogged: (value: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}
