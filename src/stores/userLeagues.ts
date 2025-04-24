import { type League } from "@/types";
import { atom } from "nanostores";

export const userLeagues = atom<League[]>([]);

export const setUserLeagues = (leagues: League[]) => {
  userLeagues.set(leagues);
};
