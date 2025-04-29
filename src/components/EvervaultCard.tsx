import { navigate } from "astro:transitions/client";
import { EvervaultCard as EvCard, Icon } from "./ui/evervault-card";

const URL = "https://app-slamstats.vercel.app/";

export function EvervaultCard() {
  return (
    <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <EvCard text="Únete a una liga" onClick={() => navigate(URL)} />

      <h2 className="dark:text-white text-black mt-4 text-sm font-light">
        Descubre ligas activas y mira cómo avanzan los jugadores en tiempo real.
      </h2>
      {/* <p className="text-sm border font-light dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5">
        Watch me hover
      </p> */}
    </div>
  );
}
