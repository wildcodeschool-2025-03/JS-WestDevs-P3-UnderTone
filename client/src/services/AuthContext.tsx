import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext<AuthContextType | null>(null);

interface ChildrenProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: ChildrenProps) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("http://localhost:3310/api/refresh", {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setIsLogged(true);
          return res.json();
        }
        return;
      })
      .then((data) => setUser(data.result));
  }, []);

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
