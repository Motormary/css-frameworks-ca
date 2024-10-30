import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { Toaster } from "sonner"
import {
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-siderbar"
import { Separator } from "@/components/ui/separator"
import Breadcrumbs from "@/components/breadcrumbs"

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-h-svh`}>
        <SidebarProvider>
          
          <AppSidebar />
          <main className="w-full max-h-[calc(100svh-64px)]">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] border-b ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumbs />
              </div>
            </header>
            <div className="h-[calc(100svh-100px)] flex justify-center overflow-y-auto pb-20 pt-4">
              {children}
            </div>
          </main>
        </SidebarProvider>
        <Toaster richColors />
      </body>
    </html>
  )
}
