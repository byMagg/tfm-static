import { useRound } from "@/hooks/useRound";
import { Card, CardContent, CardHeader } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Spinner } from "./ui/spinner";
export const GroupCards = ({
  leagueId,
  className,
}: {
  leagueId: string;
  className?: string;
}) => {
  const { round, loading, error } = useRound({ leagueId });

  return (
    <div
      className={`flex flex-col items-center justify-center w-full ${className}`}
    >
      {loading && <Spinner size="lg" className="bg-black dark:bg-white" />}
      {
        <Carousel
          opts={{
            align: "start",
          }}
          orientation="vertical"
          className="w-full max-w-sm"
        >
          <CarouselContent className="h-[250px]">
            {round?.groups.map((group, index) => (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="select-none">
                    <CardHeader>
                      <p className="font-bold text-2xl">
                        {"Grupo " + (index + 1)}
                      </p>
                    </CardHeader>
                    <ul>
                      {group.players.map((player, index) => {
                        const points = round.standings.find(
                          (s) => s.player._id === player._id,
                        )?.points;

                        return (
                          <li key={player._id} className="flex justify-between">
                            <div className="flex gap-1">
                              <strong>{index + 1}</strong>
                              <span>{player.name}</span>
                            </div>
                            <span>{points || 0}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      }
    </div>
  );
};
