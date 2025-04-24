import { navigate } from "astro:transitions/client";

export function SignoutButton() {
  async function signout() {
    const res = await fetch("/api/auth/signout");

    if (res.redirected) {
      navigate(res.url);
    }
  }

  return (
    <button
      className="w-fit border border-0.5 border-zinc-300 text-zinc-500 dark:border-zinc-700 dark:text-zinc-500 hover:text-zinc-700 hover:border-zinc-600 font-normal dark:hover:text-zinc-100 dark:hover:border-zinc-100 transition-all px-4 py-1 rounded-md"
      type="button"
      onClick={signout}
    >
      Cerrar sesión
    </button>
  );
}
