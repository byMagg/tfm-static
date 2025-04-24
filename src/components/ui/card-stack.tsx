import { motion } from "motion/react";
import { useEffect, useState } from "react";

export type Card = {
  id: number;
  name: string;
  content: React.ReactNode;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    setCards(items);
  }, [items]);

  const flipUp = () => {
    setCards((prevCards: Card[]) => {
      const newArray = [...prevCards]; // create a copy of the array
      newArray.unshift(newArray.pop()!); // move the last element to the front
      return newArray;
    });
  };

  const flipDown = () => {
    setCards((prevCards: Card[]) => {
      const newArray = [...prevCards]; // create a copy of the array
      newArray.push(newArray.shift()!); // move the first element to the back
      return newArray;
    });
  };

  return (
    <div className="flex justify-center gap-3 select-none">
      <div className="relative  h-60 w-60 md:h-60 md:w-96">
        {cards.map((card, index) => {
          return (
            <motion.div
              key={card.id}
              className="absolute dark:bg-black bg-white h-60 w-60 md:h-60 md:w-96 rounded-3xl p-4 shadow-xl border border-neutral-200 dark:border-white/[0.1]  shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col gap-3"
              style={{
                transformOrigin: "top center",
              }}
              animate={{
                top: index * -CARD_OFFSET,
                scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
                zIndex: cards.length - index, //  decrease z-index for the cards that are behind
              }}
            >
              <div className="flex justify-between">
                <p className="text-neutral-500 font-medium dark:text-white">
                  {card.name}
                </p>
                <p className="text-neutral-500  dark:text-white">Puntos</p>
              </div>
              <div className="font-normal text-neutral-700 dark:text-neutral-200">
                {card.content}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex flex-col justify-center gap-2">
        <div
          onClick={flipUp}
          className="h-8 w-8 rounded-full bg-[hsla(0,0%,100%,.1)] flex items-center justify-center -rotate-90 cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out active:-translate-y-2 active:duration-75"
        >
          <Icon />
        </div>
        <div
          onClick={flipDown}
          className="h-8 w-8 rounded-full bg-[hsla(0,0%,100%,.1)] flex items-center justify-center rotate-90 cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out active:translate-y-2 active:duration-75"
        >
          <Icon />
        </div>
      </div>
    </div>
  );
};

const Icon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-4 w-4 text-white stroke-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
      />
    </svg>
  );
};
