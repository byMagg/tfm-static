import { useCheckPlayerInLeague } from "@/hooks/useCheckPlayerInLeague";
import { useSession } from "@/hooks/useSession";
import type { League, LeagueMatch } from "@/types";
import { Spinner } from "./ui/spinner";

export const ProfileMatches = () => {
  const { leagues, loading, error } = useCheckPlayerInLeague();

  const { isLoggedIn } = useSession();

  if (!isLoggedIn) return null;

  return (
    <section className="w-full flex items-center justify-center min-h-48 my-3">
      {leagues.length === 0 && loading && (
        <Spinner size="lg" className="bg-black dark:bg-white" />
      )}

      {leagues &&
        leagues.length > 0 &&
        leagues.map((league: League) => (
          <section
            key={league._id}
            className="w-full flex flex-col justify-center items-center my-3"
          >
            <a href={`/leagues/${league._id}`} className="w-full">
              <p
                className="text-center font-bold text-2xl"
                style={{ viewTransitionName: `league-${league._id}` }}
              >
                {league.name}
              </p>
            </a>

            <article className="w-full flex flex-col justify-center items-center my-3">
              <h2 className="text-center  text-xl">Partidos esta jornada</h2>
              <ul>
                {league.matches?.map((match: LeagueMatch) => (
                  <li
                    key={match._id}
                    className="my-2 bg-white py-2 px-3 rounded text-black text-center font-semibold flex flex-col"
                  >
                    <a
                      href={`/league-matches/${match._id}`}
                      style={{
                        viewTransitionName: `match-${match._id}`,
                      }}
                    >
                      {`${match.player1.name} vs ${match.player2.name}`}
                    </a>
                    <span className="font-normal">
                      {match.score ? match.score : "Partido por jugar"}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </section>
        ))}
    </section>
  );
};
