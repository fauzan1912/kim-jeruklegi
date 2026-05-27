import { getCategoryStyle, type Category } from "@/data/articles"

interface CategoryBadgeProps {
  category: Category
  size?: "sm" | "md"
}

export default function CategoryBadge({ category, size = "sm" }: CategoryBadgeProps) {
  const style = getCategoryStyle(category)
  const sizeClasses = size === "sm" ? "text-xs px-2.5 py-0.5" : "text-sm px-3 py-1"

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full ${style.bgColor} ${style.color} ${sizeClasses} transition-transform hover:scale-105`}
    >
      {category}
    </span>
  )
}
