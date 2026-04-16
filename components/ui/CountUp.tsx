import type { CountUpProps } from "react-countup";
import type { FC } from "react";
import RawCountUp from "react-countup";

const CountUp = (
  RawCountUp &&
  typeof RawCountUp === "object" &&
  "default" in RawCountUp
    ? (RawCountUp as { default: FC<CountUpProps> }).default
    : (RawCountUp as FC<CountUpProps>)
);

export default CountUp;
