import { createContext } from "react";

interface DefaultValue {
  user: null | User;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
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

  const login = email;
};
