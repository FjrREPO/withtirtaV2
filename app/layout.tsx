import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider"
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Syne, Work_Sans } from "next/font/google"
import "./globals.css"
import { TanstackProvider } from "@/components/providers/TanstackProvider"

const font = Work_Sans({ subsets: ["latin"] })
const syne = Syne({
  subsets: ["latin"],
  display: "block",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    template: "Withtirta | %s",
    default: "Withtirta | Digital Creator",
  },
  description:
    "A personal portfolio website. I made this website to showcase my projects and skills.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "bg-zinc-50 text-zinc-800 antialiased dark:bg-neutral-900 dark:text-zinc-50",
            syne.className
          )}
        >
          <TanstackProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              storageKey="theme-mode"
            >
              <SmoothScrollProvider
                options={{
                  smooth: true,
                  mobile: {
                    smooth: true,
                  },
                  tablet: {
                    smooth: true,
                  },
                }}
              >
                {children}
              </SmoothScrollProvider>
            </ThemeProvider>
          </TanstackProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
