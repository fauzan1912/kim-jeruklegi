"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Image as ImageIcon, Loader2, Save } from "lucide-react"
import Editor from "@/components/Editor"

interface PageProps {
  params: {
    id: string
  }
}

export default function EditArticlePage({ params }: PageProps) {
  const router = useRouter()
  const [loadingData, setLoadingData] = useState(true)
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [category, setCategory] = useState("Berita")
  const [author, setAuthor] = useState("")
  const [image, setImage] = useState("")
  const [readTime, setReadTime] = useState(5)
  const [content, setContent] = useState("")

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoadingData(true)
        const res = await fetch(`/api/articles/${params.id}`)
        if (!res.ok) {
          throw new Error("Artikel tidak ditemukan")
        }
        const data = await res.json()
        setTitle(data.title)
        setExcerpt(data.excerpt)
        setCategory(data.category)
        setAuthor(data.author)
        setImage(data.image)
        setReadTime(data.readTime)
        setContent(data.content)
      } catch (err: any) {
        setError(err.message || "Gagal memuat artikel")
      } finally {
        setLoadingData(false)
      }
    }

    if (params.id) {
      fetchArticle()
    }
  }, [params.id])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploadingImage(true)
      setError(null)

      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Gagal mengunggah gambar")
      }

      setImage(data.url)
    } catch (err: any) {
      setError(err.message || "Gagal mengunggah gambar")
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!image) {
      setError("Gambar artikel wajib diunggah.")
      return
    }
    if (!content || content === "<p></p>") {
      setError("Konten artikel wajib diisi.")
      return
    }

    try {
      setLoading(true)
      setError(null)

      const res = await fetch(`/api/articles/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          excerpt,
          category,
          author,
          image,
          readTime: Number(readTime),
          content,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Gagal memperbarui artikel")
      }

      router.push("/admin")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Gagal memperbarui artikel")
    } finally {
      setLoading(false)
    }
  }

  if (loadingData) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
          <p className="text-sm text-gray-500 font-medium">Memuat data artikel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in-up">
      <div className="flex items-center gap-3">
        <Link
          href="/admin"
          className="p-2 hover:bg-gray-150 rounded-xl transition-colors text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Artikel</h1>
          <p className="text-sm text-gray-500">Perbarui konten artikel berita desa.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-650 text-sm font-semibold rounded-xl p-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200/80 rounded-2xl p-6 space-y-4 shadow-sm">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">Judul Artikel</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-450 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition-all text-gray-900 font-semibold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">Ringkasan Pendek</label>
                <textarea
                  required
                  rows={3}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-450 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition-all text-gray-900 resize-none"
                />
              </div>
            </div>

            <div className="bg-white border border-gray-200/80 rounded-2xl p-6 space-y-2 shadow-sm">
              <label className="text-sm font-semibold text-gray-700 block">Konten Artikel</label>
              <Editor content={content} onChange={setContent} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200/80 rounded-2xl p-6 space-y-4 shadow-sm">
              <label className="text-sm font-semibold text-gray-700 block">Gambar Sampul</label>
              
              {image ? (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 bg-gray-50 group">
                  <img src={image} alt="Cover Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gray-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="cursor-pointer bg-white text-gray-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md hover:bg-gray-105 transition-all">
                      Ganti Gambar
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploadingImage}
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center aspect-video rounded-xl border-2 border-dashed border-gray-200 hover:border-orange-400 hover:bg-orange-50/10 cursor-pointer transition-all p-4 text-center">
                  {uploadingImage ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                      <span className="text-xs text-gray-500 font-medium">Mengunggah...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <div className="p-3 bg-gray-50 rounded-xl">
                        <ImageIcon className="w-6 h-6 text-gray-400 animate-pulse" />
                      </div>
                      <span className="text-xs font-semibold text-gray-700">Pilih berkas gambar</span>
                      <span className="text-[10px] text-gray-500">Maks. file size 5MB (PNG, JPG)</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                </label>
              )}
            </div>

            <div className="bg-white border border-gray-200/80 rounded-2xl p-6 space-y-4 shadow-sm">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">Kategori</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition-all text-gray-900 font-medium"
                >
                  <option value="Berita">Berita</option>
                  <option value="Kegiatan">Kegiatan</option>
                  <option value="Edukasi">Edukasi</option>
                  <option value="Pengumuman">Pengumuman</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">Penulis</label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-450 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition-all text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">Waktu Baca (Menit)</label>
                <input
                  type="number"
                  min={1}
                  required
                  value={readTime}
                  onChange={(e) => setReadTime(Number(e.target.value))}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-450 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition-all text-gray-900"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href="/admin"
                className="flex-1 py-3 text-center border border-gray-200 hover:bg-gray-50 text-gray-750 font-bold rounded-xl text-sm transition-colors"
              >
                Batal
              </Link>
              <button
                type="submit"
                disabled={loading || uploadingImage}
                className="flex-1 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-orange-100 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Simpan
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
