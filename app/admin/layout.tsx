"use client"

import { useSession, signOut } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  LayoutDashboard,
  FilePenLine,
  LogOut,
  User,
  Menu,
  X,
  Globe,
} from "lucide-react"
import { useState } from "react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500 font-medium">Memuat Sesi...</p>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    router.push("/admin/login")
    return null
  }

  const menuItems = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: LayoutDashboard,
      active: pathname === "/admin",
    },
    {
      href: "/admin/artikel/tambah",
      label: "Tulis Artikel",
      icon: FilePenLine,
      active: pathname === "/admin/artikel/tambah",
    },
  ]

  const handleLogout = async () => {
    if (confirm("Apakah Anda yakin ingin keluar dari panel admin?")) {
      await signOut({ callbackUrl: "/" })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 gap-2.5">
          <Image src="/logo.PNG" alt="KIM Jeruklegi Logo" width={32} height={32} className="rounded-lg animate-fade-in" />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900 leading-tight">KIM Jeruklegi</span>
            <span className="text-[10px] text-gray-500 font-semibold">Panel Administrator</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                item.active
                  ? "bg-orange-50 text-orange-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-950"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
          
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-all duration-200"
          >
            <Globe className="w-5 h-5" />
            Lihat Situs Utama
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-250 bg-gray-50/50">
          <div className="flex items-center gap-3 px-3 py-2.5 mb-3 rounded-xl bg-white border border-gray-100">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
              <User className="w-4 h-4" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-gray-900 truncate">
                {session?.user?.name || "Admin"}
              </span>
              <span className="text-[10px] text-gray-500 truncate">
                {session?.user?.email || "admin@jeruklegi.id"}
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-200 border border-red-100"
          >
            <LogOut className="w-4 h-4" />
            Keluar Sesi
          </button>
        </div>
      </aside>

      {/* Sidebar - Mobile Toggle & Drawer */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-40 sticky top-0">
          <div className="flex items-center gap-2.5">
            <Image src="/logo.PNG" alt="KIM Jeruklegi Logo" width={28} height={28} className="rounded-lg" />
            <span className="text-sm font-bold text-gray-900">Admin KIM</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-gray-500 hover:text-gray-950 focus:outline-none"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 animate-fade-in"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <aside
          className={`lg:hidden fixed top-0 bottom-0 left-0 w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
            <div className="flex items-center gap-2.5">
              <Image src="/logo.PNG" alt="KIM Logo" width={28} height={28} className="rounded-lg" />
              <span className="text-sm font-bold text-gray-900">Admin Panel</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="p-1 text-gray-500 hover:text-gray-750">
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="px-4 py-6 space-y-1.5 flex-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  item.active ? "bg-orange-50 text-orange-600" : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
            
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              <Globe className="w-5 h-5" />
              Lihat Situs Utama
            </Link>
          </nav>
          
          <div className="p-4 border-t border-gray-200 absolute bottom-0 left-0 right-0 bg-gray-50/50">
            <div className="flex items-center gap-3 px-3 py-2.5 mb-3 rounded-xl bg-white border border-gray-100">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                <User className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-gray-900 truncate">{session?.user?.name}</span>
                <span className="text-[10px] text-gray-500 truncate">{session?.user?.email}</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-red-600 hover:text-red-755 bg-red-50 rounded-xl transition-all"
            >
              <LogOut className="w-4 h-4" />
              Keluar Sesi
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 max-w-7xl w-full mx-auto animate-fade-in-up">
          {children}
        </main>
      </div>
    </div>
  )
}
