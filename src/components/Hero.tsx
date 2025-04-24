import { HeroHighlight } from "./ui/hero-highlight";

export function Hero({ children }: { children: React.ReactNode }) {
  return <HeroHighlight>{children}</HeroHighlight>;
}
