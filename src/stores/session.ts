import Cookies from "js-cookie";
import { atom } from "nanostores";

export const sessionCookie = atom(Cookies.get("__session"));
