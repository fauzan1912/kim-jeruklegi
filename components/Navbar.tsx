"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Menu, X, Search, Newspaper } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()

  if (pathname?.startsWith("/admin")) return null

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/artikel", label: "Artikel" },
    { href: "/tentang", label: "Tentang" },
    { href: "/kontak", label: "Kontak" },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="relative">
            <Image src="/logo.PNG" alt="KIM Jeruklegi Logo" width={36} height={36} className="rounded-lg" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors leading-tight">
              KIM Jeruklegi
            </span>
            <span className="text-[10px] text-gray-500 font-medium leading-tight hidden sm:block">
              Kelompok Informasi Masyarakat
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive(link.href)
                  ? "text-orange-600 bg-orange-50"
                  : "text-gray-700 hover:text-orange-600 hover:bg-orange-50/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-2">
          {/* Search */}
          <div className="relative">
            {isSearchOpen ? (
              <div className="flex items-center gap-2 animate-in slide-in-from-right-5">
                <Input
                  placeholder="Cari artikel..."
                  className="w-56 h-9 text-sm"
                  autoFocus
                  onBlur={() => setIsSearchOpen(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const target = e.target as HTMLInputElement
                      if (target.value.trim()) {
                        window.location.href = `/artikel?search=${encodeURIComponent(target.value.trim())}`
                      }
                    }
                    if (e.key === "Escape") setIsSearchOpen(false)
                  }}
                />
                <button onClick={() => setIsSearchOpen(false)} className="p-1.5 text-gray-500 hover:text-gray-700">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
              >
                <Search className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 rounded-lg text-gray-700 hover:text-orange-600 hover:bg-gray-100"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            className="p-2 rounded-lg text-gray-700 hover:text-orange-600 hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      {isSearchOpen && (
        <div className="md:hidden border-t bg-white px-4 py-3">
          <Input
            placeholder="Cari artikel..."
            className="w-full"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const target = e.target as HTMLInputElement
                if (target.value.trim()) {
                  window.location.href = `/artikel?search=${encodeURIComponent(target.value.trim())}`
                  setIsSearchOpen(false)
                }
              }
            }}
          />
        </div>
      )}

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white/95 backdrop-blur-xl">
          <nav className="container px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block text-sm font-medium rounded-lg px-4 py-3 transition-all ${
                  isActive(link.href)
                    ? "text-orange-600 bg-orange-50"
                    : "text-gray-700 hover:text-orange-600 hover:bg-orange-50/50"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
