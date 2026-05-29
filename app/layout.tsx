import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Providers } from "@/components/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "KIM Jeruklegi - Portal Berita Kelompok Informasi Masyarakat",
    template: "%s | KIM Jeruklegi",
  },
  description:
    "Portal berita dan informasi resmi Kelompok Informasi Masyarakat (KIM) Jeruklegi, Desa Katongan, Kecamatan Nglipar, Kabupaten Gunungkidul, Yogyakarta. Berita, kegiatan, edukasi, dan pengumuman untuk kemajuan masyarakat.",
  keywords: [
    "KIM Jeruklegi",
    "Kelompok Informasi Masyarakat",
    "berita desa",
    "Katongan",
    "Nglipar",
    "Gunungkidul",
  ],
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <div className="flex flex-col min-h-screen bg-gray-50">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
