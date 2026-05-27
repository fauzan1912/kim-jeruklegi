import Link from "next/link"
import { categories, getLatestArticles, type Category } from "@/data/articles"
import ArticleCard from "./ArticleCard"
import { MapPin, Phone, Mail, ArrowRight, Newspaper } from "lucide-react"

interface SidebarProps {
  activeCategory?: Category | null
}

export default function Sidebar({ activeCategory }: SidebarProps) {
  const latestArticles = getLatestArticles(3)

  return (
    <aside className="space-y-8">
      {/* Kategori */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-orange-500 rounded-full" />
          Kategori
        </h3>
        <div className="space-y-1.5">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/artikel?category=${cat.name}`}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.name
                  ? "bg-orange-50 text-orange-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={`w-2 h-2 rounded-full ${cat.bgColor}`} />
                {cat.name}
              </div>
              <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </div>

      {/* Artikel Terbaru */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-green-500 rounded-full" />
          Artikel Terbaru
        </h3>
        <div className="space-y-3">
          {latestArticles.map((article) => (
            <ArticleCard key={article.id} article={article} variant="horizontal" />
          ))}
        </div>
      </div>

      {/* Tentang KIM */}
      <div className="bg-gradient-to-br from-orange-50 to-green-50 rounded-2xl border border-orange-100/50 p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
            <Newspaper className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">KIM Jeruklegi</h3>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          Kelompok Informasi Masyarakat yang berkomitmen membangun komunikasi dan informasi berkualitas untuk kemajuan masyarakat Jeruklegi.
        </p>
        <Link
          href="/tentang"
          className="inline-flex items-center gap-1 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
        >
          Pelajari Lebih Lanjut
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Kontak Singkat */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-orange-500 rounded-full" />
          Hubungi Kami
        </h3>
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-start gap-3">
            <MapPin className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
            <span>Dusun Jeruklegi, Desa Katongan, Kec. Nglipar, Kab. Gunungkidul</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-green-500 flex-shrink-0" />
            <span>+62 812-3456-7890</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-orange-500 flex-shrink-0" />
            <span>kimjeruklrgi@gmail.com</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
