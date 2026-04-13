"use client";

export type UserDataType = {
  age: string | null;
  avatar: string | null;
  email: string;
  fullName: string;
  id: number;
  mobileNumber: string | null;
  profileComplete: boolean;
  username: string;
};

export const checkAuth = () => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (!user || !token) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return { logged: false, data: null };
  }

  try {
    const parsedUser: UserDataType = JSON.parse(user);

    return {
      logged: true,
      data: { token, user: parsedUser },
    };
  } catch {
    return { logged: false, data: null };
  }
};
