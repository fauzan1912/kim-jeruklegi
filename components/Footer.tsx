import { Users, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Newspaper } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <Newspaper className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold group-hover:text-orange-400 transition-colors">KIM Jeruklegi</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Portal berita dan informasi resmi Kelompok Informasi Masyarakat (KIM) Jeruklegi. Menyajikan berita terkini, kegiatan, dan informasi untuk kemajuan masyarakat.
            </p>
            <div className="flex space-x-3 pt-2">
              <Link
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-orange-600 transition-all duration-300 hover:scale-110"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="https://www.instagram.com/kim_jeruklegi.katongan/"
                className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 transition-all duration-300 hover:scale-110"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-500 transition-all duration-300 hover:scale-110"
              >
                <Twitter className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold relative">
              Navigasi
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-orange-500 rounded-full" />
            </h3>
            <ul className="space-y-2.5 text-sm pt-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-orange-500" />
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/artikel" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-orange-500" />
                  Artikel
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-orange-500" />
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-orange-500" />
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold relative">
              Kategori
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-green-500 rounded-full" />
            </h3>
            <ul className="space-y-2.5 text-sm pt-2">
              <li>
                <Link href="/artikel?category=Berita" className="text-gray-400 hover:text-green-400 transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-green-500" />
                  Berita
                </Link>
              </li>
              <li>
                <Link href="/artikel?category=Kegiatan" className="text-gray-400 hover:text-green-400 transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-green-500" />
                  Kegiatan
                </Link>
              </li>
              <li>
                <Link href="/artikel?category=Edukasi" className="text-gray-400 hover:text-green-400 transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-green-500" />
                  Edukasi
                </Link>
              </li>
              <li>
                <Link href="/artikel?category=Pengumuman" className="text-gray-400 hover:text-green-400 transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-green-500" />
                  Pengumuman
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold relative">
              Kontak
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-orange-500 rounded-full" />
            </h3>
            <ul className="space-y-3 text-sm text-gray-400 pt-2">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>Dusun Jeruklegi, Desa Katongan, Kec. Nglipar, Kab. Gunungkidul</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <span>kimjeruklrgi@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} KIM Jeruklegi. Semua hak dilindungi.
            </p>
            <p className="text-gray-600 text-xs">
              Portal Berita Kelompok Informasi Masyarakat Desa Katongan
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
