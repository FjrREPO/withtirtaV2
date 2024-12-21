"use client"

import useIsomorphicLayoutEffect from "@/hooks/UseIsomorphicLayoutEffect"
import gsap from "gsap"
import Link from "next/link"
import { useRef } from "react"

export default function NavHome() {
  const el = useRef<HTMLAnchorElement | null>(null)

  useIsomorphicLayoutEffect(() => {
    gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.to(el.current, { x: 0, duration: 2, ease: "power4.inOut" }, 0)
    }, el)
  }, [])

  return (
    <Link
      ref={el}
      href="/" 
      className="pointer-events-auto cursor-pointer absolute left-[1%] top-5 translate-x-[calc(-15rem-2.5vw)] md:top-4 bg-[#8c806e9f] backdrop-blur-md px-5 py-4 rounded-[50px]"
    >
      <div className="overflow-hidden pb-1">
        <div className="group inline-flex items-center gap-x-2">
          <p className="text-sm font-bold uppercase text-white">Withtirta</p>
        </div>
      </div>
    </Link>
  )
}
