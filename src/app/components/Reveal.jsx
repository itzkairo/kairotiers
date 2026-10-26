"use client";

import { motion } from "framer-motion";

const easing = [0.22, 1, 0.36, 1];

export function Reveal({ children, className = "", delay = 0, y = 14 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay, ease: easing }}
    >
      {children}
    </motion.div>
  );
}

export function RevealList({
  children,
  className = "",
  stagger = 0.06,
  delay = 0,
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 14 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: easing },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
