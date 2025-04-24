import { auth } from "@/lib/firebase/server";
import type { League, LeagueMatch, Round } from "@/types";
import { fetchAPI } from "@/utils";
import type { AstroCookies } from "astro";
import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

const checkSession = ({ cookies }: { cookies: AstroCookies }) => {
  const sessionCookie = cookies.get("__session")?.value;

  if (!sessionCookie) {
    throw new ActionError({
      code: "UNAUTHORIZED",
      message: "Usuario no autorizado",
    });
  }

  return sessionCookie;
};

export const server = {
  startSeason: defineAction({
    accept: "form",
    input: z.object({
      leagueId: z.string(),
    }),
    handler: async ({ leagueId }, { cookies }) => {
      const session = checkSession({ cookies });
      return await fetchAPI({
        endpoint: `/leagues/${leagueId}/start`,
        method: "POST",
        token: session,
      });
    },
  }),
  getLeagues: defineAction({
    input: z.object({
      limit: z.number().optional(),
      page: z.number().optional(),
    }),
    handler: async ({ limit, page }, { cookies }) => {
      const session = checkSession({ cookies });
      return await fetchAPI({
        endpoint: "/leagues",
        limit,
        page,
        token: session,
      });
    },
  }),
  getLeague: defineAction({
    input: z.object({
      leagueId: z.string(),
    }),
    handler: async ({ leagueId }, { cookies }) => {
      const session = checkSession({ cookies });

      const { data } = await fetchAPI({
        endpoint: `/leagues/${leagueId}`,
        token: session,
      });

      return data;
    },
  }),
  createLeague: defineAction({
    input: z.object({
      name: z.string(),
    }),
    handler: async ({ name }, { cookies }) => {
      const session = checkSession({ cookies });
      return await fetchAPI({
        endpoint: "/leagues",
        method: "POST",
        body: { name },
        token: session,
      });
    },
  }),
  addPlayersToLeague: defineAction({
    input: z.object({
      leagueId: z.string(),
      playerIds: z.array(z.string()),
    }),
    handler: async ({ leagueId, playerIds }, { cookies }) => {
      const session = checkSession({ cookies });
      return await fetchAPI({
        endpoint: `/leagues/${leagueId}/players`,
        method: "POST",
        body: { playerIds },
        token: session,
      });
    },
  }),
  removePlayersFromLeague: defineAction({
    input: z.object({
      leagueId: z.string(),
      playerId: z.array(z.string()),
    }),
    handler: async ({ leagueId, playerId }, { cookies }) => {
      const session = checkSession({ cookies });
      return await fetchAPI({
        endpoint: `/leagues/${leagueId}/players`,
        method: "DELETE",
        body: { playerIds: playerId },
        token: session,
      });
    },
  }),
  getUsers: defineAction({
    handler: async (_, { cookies }) => {
      const session = checkSession({ cookies });
      return await fetchAPI({ endpoint: "/users", token: session });
    },
  }),
  getUsersByIds: defineAction({
    input: z.object({ ids: z.array(z.string()) }),
    handler: async ({ ids }, { cookies }) => {
      const session = checkSession({ cookies });
      return await fetchAPI({
        endpoint: "/users/get-by-ids",
        method: "POST",
        body: { ids },
        token: session,
      });
    },
  }),
  checkPlayerInLeague: defineAction({
    handler: async (_, { cookies }): Promise<League[]> => {
      const session = checkSession({ cookies });
      const decodedCookie = await auth.verifySessionCookie(session);

      if (!decodedCookie) return [];

      const { data } = await fetchAPI({
        endpoint: `/leagues/players/${decodedCookie.uid}`,
        token: session,
      });

      return data;
    },
  }),
  getLeagueMatchById: defineAction({
    input: z.object({ id: z.string() }),
    handler: async ({ id }, { cookies }): Promise<LeagueMatch> => {
      const session = checkSession({ cookies });

      const { data } = await fetchAPI({
        endpoint: `/league-matches/${id}`,
        token: session,
      });

      return data;
    },
  }),
  getHistoricMatches: defineAction({
    input: z.object({ leagueId: z.string() }),

    handler: async ({ leagueId }, { cookies }) => {
      const session = checkSession({ cookies });

      const { data } = await fetchAPI({
        endpoint: `/leagues/${leagueId}/matches`,
        token: session,
      });

      return data;
    },
  }),
  getRound: defineAction({
    input: z.object({ leagueId: z.string() }),
    handler: async ({ leagueId }, { cookies }): Promise<Round> => {
      const session = checkSession({ cookies });

      const { data } = await fetchAPI({
        endpoint: `/leagues/${leagueId}/rounds`,
        token: session,
      });

      return data;
    },
  }),
  setMatchDate: defineAction({
    input: z.object({ matchId: z.string(), date: z.string() }),
    handler: async ({ matchId, date }, { cookies }) => {
      const session = checkSession({ cookies });
      return await fetchAPI({
        endpoint: `/league-matches/${matchId}/date`,
        method: "POST",
        body: { date },
        token: session,
      });
    },
  }),
  setMatchScore: defineAction({
    input: z.object({
      matchId: z.string(),
      score: z.string(),
      winner: z.string(),
    }),
    handler: async ({ matchId, score, winner }, { cookies }) => {
      const session = checkSession({ cookies });
      return await fetchAPI({
        endpoint: `/league-matches/${matchId}/score`,
        method: "POST",
        body: { score, winner },
        token: session,
      });
    },
  }),
  getPlayers: defineAction({
    input: z.object({
      limit: z.number().optional(),
      page: z.number().optional(),
    }),
    handler: async ({ limit, page }, { cookies }) => {
      const session = checkSession({ cookies });
      return await fetchAPI({
        endpoint: "/players",
        limit,
        page,
        token: session,
      });
    },
  }),
  getMatches: defineAction({
    input: z.object({
      limit: z.number().optional(),
      page: z.number().optional(),
    }),
    handler: async ({ limit, page }, { cookies }) => {
      const session = checkSession({ cookies });
      return await fetchAPI({
        endpoint: "/matches",
        limit,
        page,
        token: session,
      });
    },
  }),
  getMatch: defineAction({
    input: z.object({ id: z.string() }),
    handler: async ({ id }, { cookies }) => {
      const session = checkSession({ cookies });
      return await fetchAPI({ endpoint: `/matches/${id}`, token: session });
    },
  }),
  getRankings: defineAction({
    input: z.object({
      limit: z.number().optional(),
      page: z.number().optional(),
    }),
    handler: async ({ limit, page }, { cookies }) => {
      const session = checkSession({ cookies });
      return await fetchAPI({
        endpoint: "/rankings",
        limit,
        page,
        token: session,
      });
    },
  }),
};
