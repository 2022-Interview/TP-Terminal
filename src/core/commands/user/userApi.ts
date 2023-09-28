import myAxios from "@/plugins/myAxios";

export const userRegisterApi = async (
  username: string,
  password: string,
  email: string
) => {
  if (!username || !password || !email) return null;

  return await myAxios.post("/user/register", { username, password, email });
};
