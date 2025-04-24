import type { MiddlewareHandler } from "astro";

export const onRequest: MiddlewareHandler = async (
  { cookies, originPathname, redirect, url },
  next,
) => {
  const sessionCookie = cookies.get("__session")?.value;

  const publicRoutes = ["/", "/profile"];

  const isPublic = publicRoutes.some(
    (route) =>
      originPathname === route || originPathname.startsWith(`${route}/`),
  );

  const isInternalAstro =
    originPathname.startsWith("/_actions") || originPathname.startsWith("/api");

  if (!isPublic && !sessionCookie && !isInternalAstro) {
    return redirect("/profile");
  }

  return next();
};
