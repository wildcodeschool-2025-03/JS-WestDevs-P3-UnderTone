import { type ReactNode, createContext, useContext, useState } from "react";
import type { AuthContextType, User } from "../types/authContext";

const AuthContext = createContext<AuthContextType | null>(null);

interface ChildrenProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: ChildrenProps) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  return context;
};
