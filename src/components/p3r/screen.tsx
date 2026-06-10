"use client";

import { motion } from "framer-motion";

/**
 * Dictionary-screen layout from P3R: oversized italic header sliding in
 * over a ghost echo, with content on a diagonal navy panel.
 */
export function ScreenFrame({
  title,
  children,
  wide = false,
}: {
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="relative mx-auto min-h-dvh max-w-6xl px-3 pb-24 pt-16 sm:px-6 sm:pt-20">
      {/* Header */}
      <header className="relative mb-2 select-none sm:mb-4">
        {/* Ghost echo behind */}
        <motion.span
          aria-hidden
          initial={{ x: -120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="p3r-outline-text absolute -top-2 left-3 whitespace-nowrap text-[17vw] font-black italic uppercase leading-none tracking-tighter sm:-top-4 sm:text-[9rem]"
        >
          {title}
        </motion.span>

        {/* Skewed backing bar */}
        <motion.div
          aria-hidden
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -left-10 top-[55%] h-[55%] w-[120%] origin-left -skew-x-12 bg-white/10"
        />

        <motion.h1
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="relative text-[15vw] font-black italic uppercase leading-none tracking-tighter text-white drop-shadow-[0_6px_24px_rgba(0,30,120,0.8)] sm:text-[7.5rem]"
        >
          {title}
        </motion.h1>
      </header>

      {/* Diagonal navy content panel */}
      <motion.section
        initial={{ x: 90, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        className={`relative ${wide ? "" : "max-w-3xl"}`}
      >
        <div
          className="relative overflow-hidden border-l-4 border-p3r-cyan/70 bg-gradient-to-br from-[#0d2fa0]/90 via-[#081d6e]/90 to-[#04114d]/95 shadow-[0_18px_60px_rgba(0,10,50,0.6)] backdrop-blur-[2px]"
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 2.2rem) 0, 100% 2.2rem, 100% 100%, 2.2rem 100%, 0 calc(100% - 2.2rem))",
          }}
        >
          {/* Subtle moving hatch inside panel */}
          <div className="p3r-stripes pointer-events-none absolute inset-0 opacity-30" />
          <div className="relative p-5 sm:p-8">{children}</div>
        </div>
      </motion.section>
    </div>
  );
}
