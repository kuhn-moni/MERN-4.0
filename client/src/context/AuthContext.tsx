import { createContext, useState, ReactNode, useEffect } from "react";
import { NotOk, User } from "../@types";

interface LoginResult {
  verified: boolean;
  token: string;
  user: User;
}

interface DefaultValue {
  user: null | User;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const initialValue: DefaultValue = {
  user: null,
  setUser: () => {
    throw new Error("context not implemented.");
  },
  login: () => {
    throw new Error("context not implemented.");
  },
  logout: () => {
    throw new Error("context not implemented.");
  },
};

export const AuthContext = createContext<DefaultValue>(initialValue);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<null | User>(null);
  const baseURL = import.meta.env.VITE_SERVER_BASE as string;

  const login = async (email: string, password: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("password", password);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };
    try {
      const response = await fetch(`${baseURL}api/users/login`, requestOptions);
      if (!response.ok) {
        const result = (await response.json()) as NotOk;
        alert(result.error);
      } else {
        const result = (await response.json()) as LoginResult;
        console.log(result);
        setUser(result.user);
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const getActiveUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
        };
        const response = await fetch(`${baseURL}api/users/me`, requestOptions);
        const result = (await response.json()) as User;
        setUser(result);
        // console.log("active user", result);
      } catch (error) {
        console.log(error);
      }
    } else {
      setUser(null);
    }
  };
  console.log("active user", user);

  useEffect(() => {
    getActiveUser().catch((e) => console.log(e));
  }, []);

  // added setUser to value so we can update user state from other components
  return <AuthContext.Provider value={{ user, setUser, login, logout }}>{children}</AuthContext.Provider>; 
};
