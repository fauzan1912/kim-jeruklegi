"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Newspaper,
  Plus,
  Search,
  Edit2,
  Trash2,
  Calendar,
  User,
  ExternalLink,
  Loader2,
  AlertCircle,
} from "lucide-react"

interface Article {
  id: number
  title: string
  category: string
  author: string
  date: string
  image: string
  slug: string
}

export default function AdminDashboardPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const fetchArticles = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/articles")
      if (!res.ok) {
        throw new Error("Gagal memuat artikel")
      }
      const data = await res.json()
      setArticles(data)
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus artikel "${title}"?`)) {
      return
    }

    try {
      setDeletingId(id)
      const res = await fetch(`/api/articles/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        throw new Error("Gagal menghapus artikel")
      }

      setArticles((prev) => prev.filter((art) => art.id !== id))
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan saat menghapus")
    } finally {
      setDeletingId(null)
    }
  }

  const filteredArticles = articles.filter(
    (art) =>
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const stats = {
    total: articles.length,
    berita: articles.filter((a) => a.category === "Berita").length,
    kegiatan: articles.filter((a) => a.category === "Kegiatan").length,
    edukasi: articles.filter((a) => a.category === "Edukasi").length,
    pengumuman: articles.filter((a) => a.category === "Pengumuman").length,
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelola Artikel</h1>
          <p className="text-sm text-gray-500">Tulis, edit, dan hapus artikel berita desa.</p>
        </div>
        <Link
          href="/admin/artikel/tambah"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl shadow-lg shadow-orange-100 hover:shadow-xl transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          Tulis Artikel Baru
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Total Artikel", val: stats.total },
          { label: "Berita", val: stats.berita },
          { label: "Kegiatan", val: stats.kegiatan },
          { label: "Edukasi", val: stats.edukasi },
          { label: "Pengumuman", val: stats.pengumuman },
        ].map((stat, idx) => (
          <div key={idx} className="p-4 bg-white border border-gray-200/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <span className="text-xs font-semibold text-gray-500 block">{stat.label}</span>
            <span className="text-2xl font-extrabold text-gray-900 mt-1 block">{stat.val}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-150 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari judul, kategori, atau penulis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-450 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition-all"
            />
          </div>
          <span className="text-xs font-medium text-gray-500">
            Menampilkan {filteredArticles.length} artikel
          </span>
        </div>

        {loading ? (
          <div className="p-16 flex justify-center items-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
              <p className="text-sm text-gray-500 font-medium">Memuat data artikel...</p>
            </div>
          </div>
        ) : error ? (
          <div className="p-10 flex flex-col items-center text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mb-3" />
            <h3 className="text-lg font-bold text-gray-900">Gagal Memuat Data</h3>
            <p className="text-sm text-gray-500 mt-1">{error}</p>
            <button
              onClick={fetchArticles}
              className="mt-4 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold rounded-xl transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex justify-center items-center mx-auto mb-4 text-gray-450">
              <Newspaper className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-gray-900">Belum Ada Artikel</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
              {searchQuery
                ? "Tidak ada artikel yang cocok dengan pencarian Anda."
                : "Mulai buat artikel pertama Anda dengan mengklik tombol 'Tulis Artikel Baru' di atas."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-150 text-xs font-semibold text-gray-600 uppercase">
                  <th className="p-4 pl-6">Artikel</th>
                  <th className="p-4">Kategori</th>
                  <th className="p-4">Penulis</th>
                  <th className="p-4">Tanggal</th>
                  <th className="p-4 pr-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 pl-6 max-w-md">
                      <div className="flex gap-4 items-center">
                        <div className="relative w-16 h-10 rounded-lg overflow-hidden border border-gray-100 shrink-0 bg-gray-100">
                          {article.image && (
                            <Image
                              src={article.image}
                              alt={article.title}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div className="min-w-0">
                          <span className="font-semibold text-gray-900 block truncate">
                            {article.title}
                          </span>
                          <span className="text-xs text-gray-400 block truncate">
                            Slug: {article.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          article.category === "Berita"
                            ? "bg-orange-100 text-orange-850"
                            : article.category === "Kegiatan"
                            ? "bg-green-100 text-green-850"
                            : article.category === "Edukasi"
                            ? "bg-blue-100 text-blue-855"
                            : "bg-purple-100 text-purple-850"
                        }`}
                      >
                        {article.category}
                      </span>
                    </td>

                    <td className="p-4 text-gray-600 font-medium">
                      <div className="flex items-center gap-1.5">
                        <User className="w-4 h-4 text-gray-450" />
                        {article.author}
                      </div>
                    </td>

                    <td className="p-4 text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-gray-405" />
                        {new Date(article.date).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </td>

                    <td className="p-4 pr-6 text-right space-x-1.5 whitespace-nowrap">
                      <Link
                        href={`/artikel/${article.slug}`}
                        target="_blank"
                        className="inline-flex items-center justify-center p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                        title="Lihat Halaman Publik"
                      >
                        <ExternalLink className="w-4.5 h-4.5" />
                      </Link>
                      <Link
                        href={`/admin/artikel/edit/${article.id}`}
                        className="inline-flex items-center justify-center p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all"
                        title="Edit Artikel"
                      >
                        <Edit2 className="w-4.5 h-4.5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(article.id, article.title)}
                        disabled={deletingId === article.id}
                        className="inline-flex items-center justify-center p-2 text-red-650 hover:text-red-750 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
                        title="Hapus Artikel"
                      >
                        {deletingId === article.id ? (
                          <Loader2 className="w-4.5 h-4.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-4.5 h-4.5" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
