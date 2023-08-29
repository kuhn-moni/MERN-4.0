import { createContext, useState, ReactNode } from "react";
import { NotOk, User } from "../@types";

interface LoginResult {
  verified: boolean;
  token: string;
}

interface DefaultValue {
  user: null | User;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface LoginResult {
  verified: boolean;
  token: string;
  user: User;
}

const initialValue: DefaultValue = {
  user: null,
  login: () => {
    throw new Error("context not implemented.");
  },
  logout: () => {
    throw new Error("context not implemented.");
  },
};

export const AuthContext = createContext<DefaultValue>(initialValue);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(false);
  const baseURL = import.meta.env.VITE_SERVER_BASE as string;

  const login = (email: string, password: string) => {
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
      setEmail("");
      setPassword("");
    }
    const logout = () => {
      //logout logic goes here
    };

    //const getActiveUser = () => {
    //logic goes here

    return (
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
};
