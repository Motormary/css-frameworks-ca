import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { Toaster } from "sonner"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-siderbar"
import { Separator } from "@/components/ui/separator"
import Breadcrumbs from "@/components/breadcrumbs"
import { ThemeProvider } from "@/components/theme-provider"
import SearchPosts from "@/components/post/search"
import { cookies } from "next/headers"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Y",
  description: "Media for the people",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const isAuth = cookieStore.has("token")
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-h-svh`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
          <SidebarProvider
            className="max-w-screen overflow-hidden"
            defaultOpen={defaultOpen}>
            {isAuth ? <AppSidebar /> : null}
            <main className="w-full">
              {isAuth ? (
                <header className="relative flex justify-center border-b px-1 h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear max-[400px]:pr-4">
                  <div className="min-[400px]:absolute left-2 flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                      orientation="vertical"
                      className="mr-2 h-4 max-xl:hidden"
                    />
                    <Breadcrumbs />
                  </div>
                  <SearchPosts className="z-20" />
                </header>
              ) : null}
              <div className="h-[calc(100svh-64px)] overflow-x-hidden flex justify-center overflow-y-auto pb-20 pt-4">
                {children}
              </div>
            </main>
          </SidebarProvider>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
