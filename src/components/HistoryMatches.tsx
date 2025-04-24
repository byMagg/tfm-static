import { useHistoricMatches } from "@/hooks/useHistoricMatches";
import { Card, CardContent, CardHeader } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Skeleton } from "./ui/skeleton";

import AutoScroll from "embla-carousel-auto-scroll";
import { useRef } from "react";
export const HistoryMatches = ({
  leagueId,
  className,
}: {
  leagueId: string;
  className?: string;
}) => {
  const { matches, loading, error } = useHistoricMatches({
    leagueId,
  });

  const plugin = useRef(AutoScroll({ stopOnInteraction: false, speed: 0.5 }));

  return (
    <section className="flex flex-col items-center">
      {loading && <HistoricSkeleton />}

      {matches.length > 0 && (
        <div
          className={`flex flex-col items-center justify-center w-full ${className}`}
        >
          <Carousel plugins={[plugin.current]} className="w-full max-w-lg">
            <CarouselContent>
              {matches.map((match, index) => (
                <CarouselItem key={index} className="w-full max-w-52">
                  <Card>
                    <CardContent className="select-none">
                      <CardHeader>
                        <span className="relative z-20 text-sm leading-[1.6] font-normal text-neutral-800 dark:text-gray-100">
                          {match.player1.name} vs {match.player2.name}
                        </span>
                      </CardHeader>
                      <div className="flex justify-between items-end">
                        <span className="flex flex-col gap-1">
                          <span className="text-sm leading-[1.6] font-normal text-neutral-500 dark:text-gray-400">
                            Gana{" "}
                            {match.winner === match.player1._id
                              ? match.player1.name
                              : match.player2.name}
                          </span>
                          <span className="text-sm leading-[1.6] font-normal text-neutral-500 dark:text-gray-400">
                            {match.score}
                          </span>
                        </span>
                        <span className="text-sm leading-[1.6] font-normal text-neutral-500 dark:text-gray-400">
                          {new Date(match.date).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}
    </section>
  );
};

const HistoricSkeleton = () => {
  return (
    <div className="space-y-3">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-72" />
    </div>
  );
};
