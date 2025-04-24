import type { JwtPayload } from "@/types";
import { jwtDecode } from "jwt-decode";
import { auth } from "./firebase/server";

export async function getUser(cookie: string) {
  try {
    const decodedIdToken = await auth.verifySessionCookie(cookie, true);
    return auth.getUser(decodedIdToken.uid);
  } catch (error) {
    return null;
  }
}

// export async function login({
//   email,
//   password,
// }: {
//   email: string;
//   password: string;
// }) {
//   try {
//     const res = await fetchAPI({
//       endpoint: "/login",
//       method: "POST",
//       body: {
//         email,
//         password,
//       },
//     });

//     return res.data;
//   } catch (error) {
//     throw error;
//   }
// }

export function decodeJWT(token: string): JwtPayload {
  return jwtDecode(token);
}
