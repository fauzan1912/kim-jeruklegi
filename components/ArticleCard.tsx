import Image from "next/image"
import Link from "next/link"
import { Clock, User } from "lucide-react"
import CategoryBadge from "./CategoryBadge"
import { formatDate, type Article } from "@/data/articles"

interface ArticleCardProps {
  article: Article
  variant?: "default" | "horizontal"
}

export default function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  if (variant === "horizontal") {
    return (
      <Link href={`/artikel/${article.slug}`} className="group block">
        <article className="flex gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-orange-200 transition-all duration-300">
          <div className="relative w-28 h-28 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="flex flex-col justify-between flex-1 min-w-0">
            <div>
              <CategoryBadge category={article.category} size="sm" />
              <h3 className="mt-1.5 text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors">
                {article.title}
              </h3>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
              <span>{formatDate(article.date)}</span>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={`/artikel/${article.slug}`} className="group block">
      <article className="overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-orange-200 hover:-translate-y-1 transition-all duration-300">
        <div className="relative h-52 overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 left-3">
            <CategoryBadge category={article.category} />
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors duration-200 mb-2">
            {article.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-3">
              <span>{formatDate(article.date)}</span>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{article.readTime} menit</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
