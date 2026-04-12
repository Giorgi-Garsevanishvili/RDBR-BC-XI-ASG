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
import { checkAuth } from "@/lib/checkAuth";

const LogInData = z.object({
  email: z.email().trim(),
  password: z.string().min(3, "Password Must be At Least 3 Characters").trim(),
});

export type LoginDataType = z.infer<typeof LogInData>;

type RegisterReturnDataType = {
  token: string;
  user: {
    age: null;
    avatar: null;
    email: string;
    fullName: null;
    id: number;
    mobileNumber: null;
    profileComplete: boolean;
    username: string;
  };
};

type AuthContextType = {
  loggedIn: boolean;
  signIn: (data: LoginDataType) => Promise<boolean>;
  signOut: () => void;
  reCheck: () => void;
  error: string;
  AfterRegisterAuth: (data: RegisterReturnDataType) => boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    reCheck();
  }, []);

  const reCheck = () => {
    const authStatus = checkAuth();
    setLoggedIn(authStatus.logged);
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

      setLoggedIn(true);
      return true;
    } else {
      return false;
    }
  };

  const signOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    reCheck();
  };

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, loggedIn, reCheck, AfterRegisterAuth, error }}
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
