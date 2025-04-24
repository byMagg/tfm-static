import { auth } from "@/lib/firebase/server";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const name = formData.get("name")?.toString();

  if (!email || !password || !name) {
    return new Response("Faltan datos del formulario", { status: 400 });
  }

  /* Crear un usuario */
  try {
    const user = await auth.createUser({
      email,
      password,
      displayName: name,
    });

    if (!user) {
      return new Response("Algo salió mal", { status: 400 });
    }
  } catch (error: any) {
    if (error.code === "auth/email-already-exists") {
      return new Response("El correo ya está en uso", { status: 400 });
    }

    return new Response("Algo salió mal", { status: 400 });
  }
  return redirect("/");
};
