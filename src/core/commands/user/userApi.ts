import myAxios from "@/plugins/myAxios";

/**
 * 用户注册
 * @param username
 * @param password
 * @param email
 * @returns
 */
export const userRegisterApi = async (
  username: string,
  password: string,
  email: string
) => {
  if (!username || !password || !email) return null;

  return await myAxios.post("/user/register", { username, password, email });
};

/**
 * 用户登录
 * @param username
 * @param password
 * @returns
 */

export const userLoginApi = async (username: string, password: string) => {
  if (!username || !password) return null;
  return await myAxios.post("/user/login", { username, password });
};

/**
 * 用户登出
 * @returns
 */
export const userLogoutApi = async () => {
  return await myAxios.post("/user/logout");
};

/**
 * 获取用户信息
 * @returns
 */
export const getUserInfo = async () => {
  return await myAxios.post("/user/info");
};
