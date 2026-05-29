import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: {
        date: "desc",
      },
    })
    return NextResponse.json(articles)
  } catch (error: any) {
    console.error("Fetch articles error:", error)
    return NextResponse.json({ error: "Gagal mengambil data artikel" }, { status: 500 })
  }
}

async function generateUniqueSlug(title: string) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")

  let count = 0
  let uniqueSlug = slug
  while (true) {
    const existing = await prisma.article.findUnique({
      where: { slug: uniqueSlug },
    })
    if (!existing) {
      break
    }
    count++
    uniqueSlug = `${slug}-${count}`
  }
  return uniqueSlug
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { title, excerpt, content, category, author, image, readTime } = body

    if (!title || !excerpt || !content || !category || !author || !image) {
      return NextResponse.json({ error: "Kolom wajib diisi" }, { status: 400 })
    }

    const slug = await generateUniqueSlug(title)

    const article = await prisma.article.create({
      data: {
        slug,
        title,
        excerpt,
        content,
        category,
        author,
        image,
        readTime: Number(readTime) || 5,
        date: new Date(),
      },
    })

    return NextResponse.json(article, { status: 201 })
  } catch (error: any) {
    console.error("Create article error:", error)
    return NextResponse.json({ error: error.message || "Gagal membuat artikel" }, { status: 500 })
  }
}
