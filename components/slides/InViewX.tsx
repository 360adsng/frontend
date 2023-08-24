"use client"
import { useRef } from "react";
import { useInView } from "framer-motion";


interface SectionProps {
    children: React.ReactNode;
    val:Number
  }

const SectionX = ({ children, val }: SectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <section ref={ref}>
      <span
        style={{
          transform: isInView ? "none" : `translateX(${val}px)`,
          opacity: isInView ? 1 : 0,
          transition: "all cubic-bezier(0.17, 0.55, 0.55, 1) 1s"
        }}
        className="-translate-x-10 block opacity-0"
      >
        {children}
      </span>
    </section>
  );
}

export default SectionX
