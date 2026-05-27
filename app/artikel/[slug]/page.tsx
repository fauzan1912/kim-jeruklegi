import { articles, getArticleBySlug, getRelatedArticles, formatDate } from "@/data/articles"
import CategoryBadge from "@/components/CategoryBadge"
import ArticleCard from "@/components/ArticleCard"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User, Share2, ChevronRight } from "lucide-react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  if (!article) return { title: "Artikel Tidak Ditemukan" }

  return {
    title: article.title,
    description: article.excerpt,
  }
}

export default function ArticleDetailPage({ params }: PageProps) {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = getRelatedArticles(article.slug, 3)

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container px-4 md:px-6 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-600 transition-colors">
              Beranda
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/artikel" className="hover:text-orange-600 transition-colors">
              Artikel
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-gray-900 font-medium truncate max-w-[200px]">{article.title}</span>
          </nav>
        </div>
      </div>

      <div className="container px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article Content */}
          <article className="lg:col-span-2">
            {/* Back button */}
            <Link
              href="/artikel"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors mb-6 group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Kembali ke Artikel
            </Link>

            {/* Article Header */}
            <div className="mb-6">
              <CategoryBadge category={article.category} size="md" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 leading-tight">
                {article.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mt-5 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-orange-600" />
                  </div>
                  <span className="font-medium text-gray-700">{article.author}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(article.date)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime} menit baca</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8 shadow-lg">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Article Body */}
            <div
              className="article-content bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-10"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Share & Tags */}
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-700">Kategori:</span>
                <CategoryBadge category={article.category} />
              </div>
              <div className="flex items-center gap-2">
                <Share2 className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">Bagikan artikel ini</span>
              </div>
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-7 bg-gradient-to-b from-green-500 to-green-600 rounded-full" />
                  Artikel Terkait
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedArticles.map((related) => (
                    <ArticleCard key={related.id} article={related} />
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Table of Contents - simple version */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-orange-500 rounded-full" />
                  Info Artikel
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-500">Penulis</span>
                    <span className="font-medium text-gray-900">{article.author}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-500">Tanggal</span>
                    <span className="font-medium text-gray-900">{formatDate(article.date)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-500">Kategori</span>
                    <CategoryBadge category={article.category} size="sm" />
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-500">Waktu Baca</span>
                    <span className="font-medium text-gray-900">{article.readTime} menit</span>
                  </div>
                </div>
              </div>

              {/* Other articles */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-green-500 rounded-full" />
                  Artikel Lainnya
                </h3>
                <div className="space-y-3">
                  {articles
                    .filter((a) => a.slug !== article.slug)
                    .slice(0, 4)
                    .map((a) => (
                      <ArticleCard key={a.id} article={a} variant="horizontal" />
                    ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
