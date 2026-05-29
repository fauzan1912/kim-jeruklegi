import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(req: Request, { params }: RouteParams) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 })
    }

    const article = await prisma.article.findUnique({
      where: { id },
    })

    if (!article) {
      return NextResponse.json({ error: "Artikel tidak ditemukan" }, { status: 404 })
    }

    return NextResponse.json(article)
  } catch (error: any) {
    console.error("Fetch article error:", error)
    return NextResponse.json({ error: "Gagal mengambil data artikel" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 })
    }

    const body = await req.json()
    const { title, excerpt, content, category, author, image, readTime } = body

    if (!title || !excerpt || !content || !category || !author || !image) {
      return NextResponse.json({ error: "Kolom wajib diisi" }, { status: 400 })
    }

    const existing = await prisma.article.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json({ error: "Artikel tidak ditemukan" }, { status: 404 })
    }

    let slug = existing.slug
    if (title !== existing.title) {
      const baseSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
      
      let count = 0
      slug = baseSlug
      while (true) {
        const dup = await prisma.article.findFirst({
          where: { slug, id: { not: id } },
        })
        if (!dup) {
          break
        }
        count++
        slug = `${baseSlug}-${count}`
      }
    }

    const article = await prisma.article.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt,
        content,
        category,
        author,
        image,
        readTime: Number(readTime) || 5,
      },
    })

    return NextResponse.json(article)
  } catch (error: any) {
    console.error("Update article error:", error)
    return NextResponse.json({ error: error.message || "Gagal memperbarui artikel" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 })
    }

    const existing = await prisma.article.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json({ error: "Artikel tidak ditemukan" }, { status: 404 })
    }

    await prisma.article.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Artikel berhasil dihapus" })
  } catch (error: any) {
    console.error("Delete article error:", error)
    return NextResponse.json({ error: error.message || "Gagal menghapus artikel" }, { status: 500 })
  }
}
