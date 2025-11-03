"use client"

import type React from "react"

interface FloatingImage {
  id: number
  src: string
  top: number
  left: number
  width: number
  duration: number
  delay: number
  opacity: number
}

export default function FloatingBackground() {
  const images: FloatingImage[] = [
    {
      id: 1,
      src: "https://www.joinsewna.com/static/media/img14_132W.2e342e56e3702e86c9a6.webp",
      top: 1,
      left:50,
      width: 120,
      duration: 15,
      delay: 0,
      opacity: 0.8,
    },
    {
      id: 2,
      src: "https://www.joinsewna.com/static/media/img13_165W.638cd11dd3df3be8af6f.webp",
      top: 25,
      left: 65,
      width: 140,
      duration: 18,
      delay: 2,
      opacity: 0.7,
    },
    {
      id: 3,
      src: "https://www.joinsewna.com/static/media/img12_97W.c70c44b464503f0a7b11.jpg",
      top: 600,
      left: 15,
      width: 100,
      duration: 20,
      delay: 1,
      opacity: 0.75,
    },
    {
      id: 4,
      src: "https://www.joinsewna.com/static/media/img11_105W.a956a1983f8b70c91cd6.webp",
      top: 40,
      left: 90,
      width: 110,
      duration: 17,
      delay: 3,
      opacity: 0.65,
    },
    {
      id: 5,
      src: "https://www.joinsewna.com/static/media/img10_97W.6e566d084283af644fce.webp",
      top: 8,
      left: 30,
      width: 95,
      duration: 19,
      delay: 1.5,
      opacity: 0.7,
    },
    {
      id: 6,
      src: "https://www.joinsewna.com/static/media/img9_151W.dab4600f286264b47ee8.webp",
      top: 85,
      left: 37,
      width: 130,
      duration: 22,
      delay: 2.5,
      opacity: 0.8,
    },
    {
      id: 7,
      src: "https://www.joinsewna.com/static/media/img8_153W.ab1cdba242106da0a7f5.webp",
      top: 70,
      left: 9,
      width: 125,
      duration: 18,
      delay: 0.5,
      opacity: 0.6,
    },
    {
      id: 8,
      src: "https://www.joinsewna.com/static/media/img7_99W.466b4847c74a1100d8cf.webp",
      top: 20,
      left: 43,
      width: 105,
      duration: 16,
      delay: 2.8,
      opacity: 0.72,
    },
    {
      id: 9,
      src: "https://www.joinsewna.com/static/media/img5_100W.cb18445e0f95f73f476a.webp",
      top: 30,
      left: 75,
      width: 100,
      duration: 20,
      delay: 1.2,
      opacity: 0.78,
    },
    {
      id: 10,
      src: "https://www.joinsewna.com/static/media/img3_121.489c23a73323650e3be0.webp",
      top: 55,
      left: 25,
      width: 115,
      duration: 19,
      delay: 3.2,
      opacity: 0.68,
    },
    {
      id: 11,
      src: "https://www.joinsewna.com/static/media/img1_100W.c4c12c89b9425dcfb847.webp",
      top: 0,
      left: 85,
      width: 110,
      duration: 21,
      delay: 1.8,
      opacity: 0.74,
    },
    {
      id: 12,
      src: "https://www.joinsewna.com/static/media/designer.80f7a2565c25f4bb9918.jpeg",
      top: 90,
      left: 70,
      width: 135,
      duration: 17,
      delay: 2.2,
      opacity: 0.76,
    },
  ]

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden" style={{ backgroundColor: "#000" }}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none z-10" />

      {images.map((img) => (
        <div
          key={img.id}
          className="absolute floating-image"
          style={
            {
              top: `${img.top}%`,
              left: `${img.left}%`,
              "--duration": `${img.duration}s`,
              "--delay": `${img.delay}s`,
              "--opacity": img.opacity,
            } as React.CSSProperties & { "--duration": string; "--delay": string; "--opacity": number }
          }
        >
          <img
            src={img.src || "/placeholder.svg"}
            alt={`Floating design element ${img.id}`}
            className="w-auto object-contain pointer-events-none"
            style={{
              width: `${img.width}px`,
              height: "auto",
              filter: `drop-shadow(0 0 20px rgba(255, 255, 255, 0.1)) drop-shadow(0 0 40px rgba(255, 255, 255, 0.05))`,
              opacity: img.opacity,
            }}
          />
        </div>
      ))}
    </div>
  )
}
