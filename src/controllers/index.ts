import { fetchAPI } from "@/utils";

export const getUsers = async ({
  limit = 10,
  page = 1,
  token,
}: {
  limit?: number;
  page?: number;
  token: string;
}) => {
  return await fetchAPI({
    endpoint: "/users",
    token,
  });
};

export const getUsersByIds = async ({
  ids,
  token,
}: {
  ids: string[];
  token: string;
}) => {
  return await fetchAPI({
    endpoint: "/users/get-by-ids",
    method: "POST",
    body: {
      ids,
    },
    token,
  });
};

export const getLeagues = async ({
  limit = 10,
  page = 1,
  token,
}: {
  limit?: number;
  page?: number;
  token: string;
}) => {
  return await fetchAPI({
    endpoint: "/leagues",
    limit,
    page,
    token,
  });
};

export const getLeague = async ({
  id,
  token,
}: {
  id: string | undefined;
  token: string;
}) => {
  if (!id) return;

  return await fetchAPI({
    endpoint: `/leagues/${id}`,
    token,
  });
};

export const createLeague = async ({
  name,
  token,
}: {
  name: string | undefined;
  token: string;
}) => {
  if (!name) return;

  return await fetchAPI({
    endpoint: "/leagues",
    method: "POST",
    body: {
      name,
    },
    token,
  });
};

export const startSeason = async ({
  leagueId,
  token,
}: {
  leagueId: string | undefined;
  token: string;
}) => {
  if (!leagueId) return;

  return await fetchAPI({
    endpoint: `/leagues/${leagueId}/start`,
    method: "POST",
    token,
  });
};

export const addPlayersToLeague = async ({
  leagueId,
  playerIds = [],
  token,
}: {
  leagueId: string | undefined;
  playerIds: string[];
  token: string;
}) => {
  return await fetchAPI({
    endpoint: `/leagues/${leagueId}/players`,
    method: "POST",
    body: {
      playerIds,
    },
    token,
  });
};

export const removePlayersFromLeague = async ({
  leagueId,
  playerIds = [],
  token,
}: {
  leagueId: string;
  playerIds: string[];
  token: string;
}) => {
  return await fetchAPI({
    endpoint: `/leagues/${leagueId}/players`,
    method: "DELETE",
    body: {
      playerIds,
    },
    token,
  });
};

export const checkPlayerInLeague = async ({
  playerId,
  token,
}: {
  playerId: string | undefined;
  token: string;
}) => {
  if (!playerId) return;

  return await fetchAPI({
    endpoint: `/leagues/players/${playerId}`,
    token,
  });
};

export const getLeagueMatchById = async ({
  id,
  token,
}: {
  id: string | undefined;
  token: string;
}) => {
  if (!id) return;

  return await fetchAPI({
    endpoint: `/league-matches/${id}`,
    token,
  });
};

export const setMatchScore = async ({
  matchId,
  score,
  winner,
  token,
}: {
  matchId: string | undefined;
  score: string | undefined;
  winner: string | undefined;
  token: string;
}) => {
  if (!matchId || !winner || !score) return;

  return await fetchAPI({
    endpoint: `/league-matches/${matchId}/score`,
    method: "POST",
    body: {
      score,
      winner,
    },
    token,
  });
};

export const setMatchDate = async ({
  matchId,
  date,
  token,
}: {
  matchId: string | undefined;
  date: string | undefined;
  token: string;
}) => {
  if (!matchId || !date) return;

  return await fetchAPI({
    endpoint: `/league-matches/${matchId}/date`,
    method: "POST",
    body: {
      date,
    },
    token,
  });
};

export const getMatches = async ({
  limit = 10,
  page = 1,
  token,
}: {
  limit?: number;
  page?: number;
  token: string;
}) => {
  return await fetchAPI({
    endpoint: "/matches",
    limit,
    page,
    token,
  });
};

export const getMatch = async ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => {
  return await fetchAPI({
    endpoint: `/matches/${id}`,
    token,
  });
};

export const getPlayers = async ({
  limit = 10,
  page = 1,
  token,
}: {
  limit?: number;
  page?: number;
  token: string;
}) => {
  return await fetchAPI({
    endpoint: "/players",
    limit,
    page,
    token,
  });
};

export const getPlayer = async ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => {
  return await fetchAPI({
    endpoint: `/players/${id}`,
    token,
  });
};

export const getRankings = async ({
  limit = 10,
  page = 1,
  token,
}: {
  limit?: number;
  page?: number;
  token: string;
}) => {
  return await fetchAPI({
    endpoint: "/rankings",
    limit,
    page,
    token,
  });
};

export const getRanking = async ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => {
  return await fetchAPI({
    endpoint: `/rankings/${id}`,
    token,
  });
};
