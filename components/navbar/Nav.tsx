import NavMenu from "./NavMenu"

export default function Nav() {
  return (
    <nav className="pointer-events-none fixed z-[999] h-full w-screen">
      <NavMenu />
    </nav>
  )
}
