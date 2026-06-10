"use client";

import { motion } from "framer-motion";

// Screen-to-screen wipe: every navigation slides the new screen in
// from the right, like P3R submenu transitions.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ x: 70, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
