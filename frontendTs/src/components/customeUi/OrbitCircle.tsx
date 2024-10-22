import OrbitingCircles from "@/ui/magicui/orbiting-circles";
import {
  BitcoinSvg,
  SolanaSvg,
  EthereumSvg,
  PolygonSvg,
} from "../../../public/assets/index";
export function OrbitingCirclesDemo() {
  return (
    <div className="relative flex h-[600px] w-[600px] flex-col items-center justify-center overflow-hidden bg-background md:shadow-xl">
      {/* <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-black"></span> */}

      {/* Inner Circles */}
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        duration={20}
        delay={20}
        radius={80}
      >
        <BitcoinSvg />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[80px] border-none bg-transparent"
        duration={20}
        delay={10}
        radius={150}
      >
        <SolanaSvg />
      </OrbitingCircles>

      {/* Outer Circles (reverse) */}
      <OrbitingCircles
        className="size-[80px] border-none bg-transparent"
        radius={200}
        duration={20}
        reverse
      >
        <EthereumSvg />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={250}
        duration={20}
        delay={20}
        reverse
      >
        <PolygonSvg />
      </OrbitingCircles>
    </div>
  );
}
