import { prisma } from "@/lib/db"
import FeaturedArticle from "@/components/FeaturedArticle"
import ArticleCard from "@/components/ArticleCard"
import Sidebar from "@/components/Sidebar"
import Link from "next/link"
import { ArrowRight, Newspaper, TrendingUp, Users } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const dbArticles = await prisma.article.findMany({
    orderBy: {
      date: "desc",
    },
    take: 6,
  })

  const latestArticles = dbArticles.map((art) => ({
    ...art,
    category: art.category as any,
    date: art.date.toISOString(),
  }))

  const featuredArticle = latestArticles[0]
  const restArticles = latestArticles.slice(1)

  return (
    <div>
      {/* Hero / Featured Article */}
      <section className="container px-4 md:px-6 pt-6 pb-4">
        {featuredArticle ? (
          <FeaturedArticle article={featuredArticle} />
        ) : (
          <div className="h-[250px] bg-white border border-gray-100 rounded-2xl flex flex-col items-center justify-center shadow-sm p-6 text-center">
            <Newspaper className="w-10 h-10 text-orange-500 mb-2" />
            <h3 className="text-base font-bold text-gray-900">Belum Ada Artikel</h3>
            <p className="text-xs text-gray-500 max-w-xs mt-1">Daftar artikel masih kosong. Tulis artikel baru melalui panel administrator.</p>
          </div>
        )}
      </section>

      {/* Ticker / Quick Stats */}
      <section className="container px-4 md:px-6 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <Newspaper className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{latestArticles.length}+ Artikel</p>
              <p className="text-xs text-gray-500">Berita & Informasi</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">500+ Warga</p>
              <p className="text-xs text-gray-500">Terjangkau Informasi</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">4 Kategori</p>
              <p className="text-xs text-gray-500">Topik Berita</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content + Sidebar */}
      <section className="container px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span className="w-1.5 h-7 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full" />
                Berita Terkini
              </h2>
              <Link
                href="/artikel"
                className="flex items-center gap-1 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors group"
              >
                Lihat Semua
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Article Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {restArticles.map((article, index) => (
                <div key={article.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 text-center">
              <Link
                href="/artikel"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-orange-600 transition-all duration-300 shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-300 hover:-translate-y-0.5"
              >
                <Newspaper className="h-4 w-4" />
                Jelajahi Semua Artikel
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 mt-8">
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Newspaper className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">Tetap Terinformasi</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Ikuti terus berita dan informasi terbaru dari KIM Jeruklegi. Kami berkomitmen menyajikan informasi yang akurat dan bermanfaat untuk kemajuan masyarakat.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/artikel"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-all duration-300"
              >
                <Newspaper className="h-4 w-4" />
                Baca Artikel
              </Link>
              <Link
                href="/kontak"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/10"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
