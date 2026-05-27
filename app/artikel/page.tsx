"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { articles, categories, searchArticles, type Category } from "@/data/articles"
import ArticleCard from "@/components/ArticleCard"
import Sidebar from "@/components/Sidebar"
import { Search, Filter, LayoutGrid, List, Newspaper } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function ArtikelPage() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") as Category | null
  const initialSearch = searchParams.get("search") || ""

  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(initialCategory)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredArticles = useMemo(() => {
    let result = articles

    if (selectedCategory) {
      result = result.filter((a) => a.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.excerpt.toLowerCase().includes(query) ||
          a.category.toLowerCase().includes(query) ||
          a.author.toLowerCase().includes(query)
      )
    }

    return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [searchQuery, selectedCategory])

  return (
    <div>
      {/* Page Header */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-green-50 border-b border-gray-100">
        <div className="container px-4 md:px-6 py-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <Newspaper className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Artikel & Berita</h1>
          </div>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Kumpulan berita, kegiatan, edukasi, dan pengumuman terbaru dari KIM Jeruklegi untuk masyarakat Desa Katongan dan sekitarnya.
          </p>

          {/* Search & Filter Bar */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Cari artikel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-gray-200 rounded-xl h-11"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                  !selectedCategory
                    ? "bg-orange-600 text-white shadow-lg shadow-orange-200"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-600"
                }`}
              >
                Semua
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                    selectedCategory === cat.name
                      ? "bg-orange-600 text-white shadow-lg shadow-orange-200"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-600"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="hidden sm:flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 transition-colors ${viewMode === "grid" ? "bg-orange-50 text-orange-600" : "text-gray-400 hover:text-gray-600"}`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 transition-colors ${viewMode === "list" ? "bg-orange-50 text-orange-600" : "text-gray-400 hover:text-gray-600"}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Articles */}
          <div className="lg:col-span-2">
            {/* Results count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                Menampilkan <span className="font-bold text-gray-900">{filteredArticles.length}</span> artikel
                {selectedCategory && <span> dalam kategori <span className="font-semibold text-orange-600">{selectedCategory}</span></span>}
                {searchQuery && <span> untuk &ldquo;<span className="font-semibold text-orange-600">{searchQuery}</span>&rdquo;</span>}
              </p>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Artikel Tidak Ditemukan</h3>
                <p className="text-gray-500 text-sm max-w-md mx-auto">
                  Coba ubah kata kunci pencarian atau filter kategori untuk menemukan artikel yang Anda cari.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory(null)
                  }}
                  className="mt-4 px-5 py-2 bg-orange-600 text-white text-sm font-semibold rounded-xl hover:bg-orange-700 transition-colors"
                >
                  Reset Filter
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredArticles.map((article, index) => (
                  <div key={article.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                    <ArticleCard article={article} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredArticles.map((article, index) => (
                  <div key={article.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                    <ArticleCard article={article} variant="horizontal" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar activeCategory={selectedCategory} />
          </div>
        </div>
      </section>
    </div>
  )
}
