"use client"

import Image from "next/image"
import { motion } from "framer-motion";

export const Landing = () => {
  return (
    <motion.section
      id="hero"
      className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center"
      initial="initial"
      animate="animate"
    >
      <Image
        src="https://res.cloudinary.com/dutlw7bko/image/upload/v1730603157/withtirta/background_lfrc4n.jpg"
        fill={true}
        alt="background"
        className="w-full h-full object-cover"
      />
    </motion.section>
  )
}
