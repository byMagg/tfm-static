import { ContainerScroll } from "./ui/container-scroll-animation";

export function HeroScroll() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Crea ligas, gestiona partidos y asciende de grupo compitiendo
              jornada a jornada. <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                ¡Organiza tu tenis como un profesional!
              </span>
            </h1>
          </>
        }
      />
    </div>
  );
}
