export const checkAuth = () => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (!user || !token) {
    return { logged: false, data: [] };
  }

  return { logged: true, data: { token: token, user: user } };
};
