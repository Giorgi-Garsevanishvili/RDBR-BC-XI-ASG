"use client";

import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import z from "zod";
import { checkAuth, UserDataType } from "@/lib/checkAuth";

const LogInData = z.object({
  email: z.email().trim(),
  password: z.string().min(3, "Password Must be At Least 3 Characters").trim(),
});

export type LoginDataType = z.infer<typeof LogInData>;

export type RegisterReturnDataType = {
  token: string;
  user: {
    age: string | null;
    avatar: string | null;
    email: string;
    fullName: string;
    id: number;
    mobileNumber: string;
    profileComplete: boolean;
    username: string;
  };
};

type AuthContextType = {
  loggedIn: boolean;
  user: UserDataType | undefined;
  signIn: (data: LoginDataType) => Promise<boolean>;
  signOut: () => Promise<void>;
  reCheck: () => void;
  token: string;
  error: string;
  userUpdateRecorder: (data: UserDataType) => void;
  AfterRegisterAuth: (data: RegisterReturnDataType) => boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<UserDataType | undefined>();
  const [error, setError] = useState<string>("");
  const [token, setToken] = useState("");

  useEffect(() => {
    reCheck();
  }, []);

  const userUpdateRecorder = (data: UserDataType) => {
    localStorage.setItem("user", JSON.stringify(data));
  };

  const reCheck = () => {
    const authStatus = checkAuth();
    setLoggedIn(authStatus.logged);
    setUser(authStatus.data?.user);
    if (authStatus.data?.token) {
      setToken(authStatus.data?.token);
    }
  };

  const signIn = async (data: LoginDataType): Promise<boolean> => {
    const validated = LogInData.safeParse(data);

    if (!validated.success) {
      return false;
    }

    try {
      const response = await axios.post(
        "https://api.redclass.redberryinternship.ge/api/login",
        validated.data,
      );

      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));

      setToken(response.data.data.token);
      setUser(response.data.data.user);
      setLoggedIn(true);
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(`${error.response?.data.message}`);
        setTimeout(() => {
          setError("");
        }, 5000);
      } else {
        setError(`${error}`);
        setTimeout(() => {
          setError("");
        }, 6000);
      }

      setLoggedIn(false);
      return false;
    }
  };

  const AfterRegisterAuth = (data: RegisterReturnDataType) => {
    if (data.token && data.user) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setToken(data.token);
      setLoggedIn(true);
      return true;
    } else {
      return false;
    }
  };

  const signOut = async () => {
    try {
      const AuthToken = localStorage.getItem("token");
      console.log(AuthToken);

      const response = await axios.post(
        "https://api.redclass.redberryinternship.ge/api/logout",
        null,
        { headers: { Authorization: `Bearer ${AuthToken}` } },
      );

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      reCheck();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        console.log(error);
        console.log(data || error); // unknown error
      } else {
        console.log(error);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        token,
        loggedIn,
        reCheck,
        AfterRegisterAuth,
        error,
        userUpdateRecorder,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside ModalProvider");
  return context;
}
