"use client"

import About from "@/components/about/About"
import Contact from "@/components/contact/Contact"
import { Hero } from "@/components/hero/Hero"
import { Landing } from "@/components/landing/landing"
import Nav from "@/components/navbar/Nav"
import { Projects } from "@/components/projects/projects"

export default function Home() {
  return (
    <>
      <Nav />
      <main data-scroll-container className="flex flex-col items-center max-w-screen min-h-screen">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </>
  )
}
