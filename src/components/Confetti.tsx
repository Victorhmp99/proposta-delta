"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const COLORS = ["#ffd51f", "#12d8f2", "#ffffff", "#087bfa", "#812cff"];

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

type Piece = { left: string; delay: number; duration: number; drift: number; rotateEnd: number; color: string; isRect: boolean };

/* Confete único, disparado uma vez quando a seção entra na tela.
   Os valores aleatórios só são gerados no cliente (evita erro de hidratação). */
export function Confetti({ count = 24 }: { count?: number }) {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    setPieces(
      Array.from({ length: count }, (_, i) => ({
        left: `${randomBetween(5, 95)}%`,
        delay: randomBetween(0, 0.4),
        duration: randomBetween(1.6, 2.6),
        drift: randomBetween(-60, 60),
        rotateEnd: randomBetween(180, 540),
        color: COLORS[i % COLORS.length],
        isRect: i % 2 === 0,
      }))
    );
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          initial={{ y: -20, x: 0, opacity: 0, rotate: 0 }}
          whileInView={{ y: 420, x: p.drift, opacity: [0, 1, 1, 0], rotate: p.rotateEnd }}
          viewport={{ once: true }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
          className="absolute top-0"
          style={{
            left: p.left,
            width: p.isRect ? 7 : 9,
            height: p.isRect ? 12 : 9,
            borderRadius: p.isRect ? 2 : "50%",
            background: p.color,
          }}
        />
      ))}
    </div>
  );
}
