import User from "@/models/types/user";
import { cookies } from "next/headers";
import { decrypt, encrypt } from "./encryption";

type CookieName = "currentUser" | "someCookieName"; // Define the cookie names here

const setCookie = (key: CookieName, value: any) =>
  cookies().set(key, encrypt(JSON.stringify(value)));

function getCookie<T>(key: CookieName): T | null {
  const cookie = cookies().get(key);
  return cookie ? (decrypt(JSON.parse(cookie.value)) as T) : null;
}

const removeCookie = (key: CookieName) => cookies().delete(key);

const currentUser = () => getCookie<User>("currentUser");
const clearCurrentUser = () => removeCookie("currentUser");
const setCurrentUser = (user: User) => setCookie("currentUser", user);

const cookie = {
  set: setCookie,
  get: getCookie,
  remove: removeCookie,
  user: currentUser,
  clearUser: clearCurrentUser,
  setUser: setCurrentUser,
};

export default cookie;
