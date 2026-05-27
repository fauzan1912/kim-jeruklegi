import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock, User } from "lucide-react"
import CategoryBadge from "./CategoryBadge"
import { formatDate, type Article } from "@/data/articles"

interface FeaturedArticleProps {
  article: Article
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <Link href={`/artikel/${article.slug}`} className="group block">
      <article className="relative overflow-hidden rounded-2xl h-[420px] md:h-[480px]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <CategoryBadge category={article.category} size="md" />
              <span className="text-white/80 text-sm font-medium flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {article.readTime} menit baca
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight group-hover:text-orange-300 transition-colors duration-300">
              {article.title}
            </h2>
            <p className="text-gray-300 text-sm md:text-base line-clamp-2 leading-relaxed">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <div className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
                <span>•</span>
                <span>{formatDate(article.date)}</span>
              </div>
              <div className="flex items-center gap-1 text-orange-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Baca Selengkapnya
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
