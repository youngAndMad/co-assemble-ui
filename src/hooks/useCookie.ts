"use server";

import { decrypt, encrypt } from "@/libs/encryption";
import User from "@/models/types/user";
import { cookies } from "next/headers";

type CookieName = "currentUser" | "someCookieName"; // Define the cookie names here

const setCookie = (key: CookieName, value: any) =>
  cookies().set(key, encrypt(JSON.stringify(value)));

function getCookie<T>(key: CookieName): T | null {
  const cookie = cookies().get(key);
  return cookie ? (JSON.parse(decrypt(cookie.value)) as T) : null;
}

const removeCookie = (key: CookieName) => cookies().delete(key);

const currentUser = () => getCookie<User>("currentUser");
const clearCurrentUser = () => removeCookie("currentUser");
const setCurrentUser = (user: User) => setCookie("currentUser", user);

function useCookie() {
  return {
    set: setCookie,
    get: getCookie,
    remove: removeCookie,
    user: currentUser,
    clearUser: clearCurrentUser,
    setUser: setCurrentUser,
  };
}

export default useCookie;
