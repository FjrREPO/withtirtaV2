"use client"

import useIsomorphicLayoutEffect from "@/hooks/UseIsomorphicLayoutEffect"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { useEffect, useRef, useState } from "react"
import ThemeSwitcher from "../ThemeSwitcher"
import MagneticEffect from "../providers/MagneticEffect"
import NavMenuBtn from "./NavMenuBtn"
import NavMenuLine from "./NavMenuLine"
import NavMenuLink from "./NavMenuLink"
import NavMenuSocial from "./NavMenuSocial"
import Link from "next/link"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"

export default function NavMenu() {
  const [active, setActive] = useState<boolean>(false)
  const [scroll, setScroll] = useState<LocomotiveScroll | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const menuBgRef = useRef<HTMLDivElement | null>(null)

  const toggleHamburger = (status: boolean) => {
    setActive(status)
  }

  useEffect(() => {
    import("locomotive-scroll").then((locomotiveModule) => {
      const locomotivescroll = new locomotiveModule.default() as unknown as LocomotiveScroll;
      setScroll(locomotivescroll);
    })
  }, [])

  useIsomorphicLayoutEffect(() => {
    gsap.context(() => {
      if (active) {
        gsap.to(menuRef.current, { x: 0, duration: 0.8, ease: "power3.inOut" })
        gsap.to(".nav-rounded", {
          scaleX: 0,
          duration: 0.8,
          ease: "power3.inOut",
        })
        gsap.to(menuBgRef.current, {
          opacity: 1,
          duration: 0.8,
          ease: "power3.inOut",
        })
      } else {
        gsap.to(menuRef.current, {
          x: "140%",
          duration: 0.8,
          ease: "power3.inOut",
        })
        gsap.to(".nav-rounded", {
          scaleX: 1,
          duration: 0.8,
          ease: "power3.inOut",
        })
        gsap.to(menuBgRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power3.inOut",
        })
      }
    }, menuRef)
  }, [active])

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setActive(false)
    }
  }

  const handleScroll = (id: string) => {
    scroll && scroll.scrollTo(id, { duration: 2 })
    setActive(false)
  }

  return (
    <>
      <div
        ref={menuBgRef}
        className={cn(
          "nav-menu-bg absolute left-0 top-0 h-screen w-full bg-gradient-to-r from-black/[.13] via-black/[.16] to-black/[.35] opacity-0",
          active ? "pointer-events-auto" : "pointer-events-none"
        )}
        onClick={() => setActive(false)}
        onKeyDown={() => handleKeyDown}
      ></div>
      <div
        ref={menuRef}
        className={cn(
          "nav-menu pointer-events-auto absolute right-0 top-0 flex h-full w-full max-w-lg translate-x-[150%] flex-col justify-between bg-zinc-800 pb-12 pt-[clamp(3.5rem,10vh,5rem)] text-6xl text-white will-change-transform [-webkit-perspective:1000] dark:bg-zinc-200"
        )}
      >
        <div className="nav-rounded absolute left-0 top-[-10%] z-[-1] h-[120%] w-[80%] -translate-x-1/2 rounded-[100%_100%] bg-zinc-800 will-change-transform [-webkit-perspective:1000] dark:bg-zinc-200"></div>
        <div>
          <NavMenuLine title={"Navigation"} />
        </div>
        <div>
          <MagneticEffect>
            <NavMenuLink
              title={"Home"}
              active={active}
              duration={1}
              handleScroll={() => handleScroll("#hero")}
            />
          </MagneticEffect>
          <MagneticEffect>
            <NavMenuLink
              title={"About"}
              active={active}
              duration={1}
              handleScroll={() => handleScroll("#about")}
            />
          </MagneticEffect>
          <MagneticEffect>
            <NavMenuLink
              title={"Articles"}
              active={active}
              duration={1}
              handleScroll={() => handleScroll("#articles")}
            />
          </MagneticEffect>
          <MagneticEffect>
            <NavMenuLink
              title={"Projects"}
              active={active}
              duration={1.2}
              handleScroll={() => handleScroll("#projects")}
            />
          </MagneticEffect>
          <MagneticEffect>
            <NavMenuLink
              title={"Contact"}
              active={active}
              duration={1.3}
              handleScroll={() => handleScroll("#contact")}
            />
          </MagneticEffect>
        </div>
        <div>
          <NavMenuLine title={"Links"} />
          <div className="flex gap-x-2 px-[clamp(1.25rem,3vw,2.5rem)] text-base">
            <MagneticEffect>
              <NavMenuSocial
                title="Linkedin"
                active={active}
                classes="pr-6"
                duration={1.2}
                link="https://www.linkedin.com/in/aulia-ikhsan-tirta-793b26206/"
              />
            </MagneticEffect>
            <MagneticEffect>
              <NavMenuSocial
                title="Instagram"
                active={active}
                classes="pr-6"
                duration={1.4}
                link="https://www.instagram.com/withtirta/"
              />
            </MagneticEffect>
            <MagneticEffect>
              <NavMenuSocial
                title="Tiktok"
                active={active}
                classes="pr-6"
                duration={1.6}
                link="https://www.tiktok.com/@withtirta"
              />
            </MagneticEffect>
            <MagneticEffect>
              <NavMenuSocial
                title="Email"
                active={active}
                classes="pr-6"
                duration={1.8}
                link="mailto:auliaikhsantirta@gmail.com"
              />
            </MagneticEffect>
            <MagneticEffect>
              <div className="text-zinc-200 dark:text-zinc-800">
                <SignedOut>
                  <SignInButton />
                  <div className="h-[2px] w-full origin-center -translate-y-2 scale-x-0 rounded-full bg-zinc-200 transition group-hover:translate-y-0 group-hover:scale-x-100 dark:bg-zinc-800" />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                  <div className="h-[2px] w-full origin-center -translate-y-2 scale-x-0 rounded-full bg-zinc-200 transition group-hover:translate-y-0 group-hover:scale-x-100 dark:bg-zinc-800" />
                </SignedIn>
              </div>
            </MagneticEffect>
            <SignedIn>
              <Link
                href={"/admin"}
                className={"group"}
              >
                <MagneticEffect>
                  <p className="text-zinc-200 dark:text-zinc-800">Admin</p>
                  <div className="h-[2px] w-full origin-center -translate-y-2 scale-x-0 rounded-full bg-zinc-200 transition group-hover:translate-y-0 group-hover:scale-x-100 dark:bg-zinc-800" />
                </MagneticEffect>
              </Link>
            </SignedIn>
          </div>
          <div className="flex px-[clamp(1.25rem,3vw,2.5rem)]">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
      <NavMenuBtn active={active} toggleHamburger={toggleHamburger} />
    </>
  )
}
