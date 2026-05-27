import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MessageCircle, BookOpen, Target, Eye, Heart, Award, Handshake, Lightbulb } from "lucide-react"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Profil Kelompok Informasi Masyarakat (KIM) Jeruklegi - Visi, misi, dan program unggulan untuk kemajuan masyarakat Desa Katongan.",
}

export default function TentangPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-green-600 py-20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="container px-4 md:px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
              <Users className="h-4 w-4" />
              Kelompok Informasi Masyarakat
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Tentang <span className="text-orange-200">KIM Jeruklegi</span>
            </h1>
            <p className="text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
              Wadah partisipasi masyarakat dalam mengakses, mengelola, dan menyebarkan informasi
              untuk pembangunan daerah Desa Katongan, Kecamatan Nglipar, Kabupaten Gunungkidul.
            </p>
          </div>
        </div>
      </section>

      {/* Tentang */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 rounded-full text-orange-600 text-sm font-semibold mb-4">
                <Lightbulb className="h-4 w-4" />
                Siapa Kami
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Menjembatani Informasi untuk <span className="text-orange-600">Kemajuan Masyarakat</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Kelompok Informasi Masyarakat (KIM) Jeruklegi adalah organisasi kemasyarakatan yang didirikan
                  oleh warga Dusun Jeruklegi, Desa Katongan, Kecamatan Nglipar, Kabupaten Gunungkidul, Yogyakarta.
                </p>
                <p>
                  KIM Jeruklegi berdiri sebagai wadah bagi masyarakat untuk berpartisipasi aktif dalam proses
                  komunikasi dan informasi. Kami percaya bahwa masyarakat yang terinformasi dengan baik adalah
                  fondasi dari pembangunan yang berkelanjutan.
                </p>
                <p>
                  Melalui berbagai program dan kegiatan, KIM Jeruklegi terus berupaya meningkatkan literasi
                  informasi masyarakat, memfasilitasi dialog antara pemerintah dan warga, serta mendorong
                  partisipasi aktif dalam pembangunan desa.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/community-meeting-discussion.png"
                  alt="Kegiatan KIM Jeruklegi"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-green-600 rounded-xl flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">500+</p>
                    <p className="text-sm text-gray-500">Warga Terjangkau</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Visi */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-5">
                  <Eye className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Visi</h3>
                <p className="text-white/90 leading-relaxed text-lg">
                  Mewujudkan masyarakat Jeruklegi yang cerdas, berdaya, dan sejahtera melalui akses
                  informasi dan komunikasi yang berkualitas.
                </p>
              </div>
            </div>

            {/* Misi */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-5">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Misi</h3>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0" />
                    Menyediakan informasi yang akurat, tepat waktu, dan bermanfaat bagi masyarakat
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0" />
                    Meningkatkan literasi informasi dan digital masyarakat
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0" />
                    Memfasilitasi komunikasi antara pemerintah dan masyarakat
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0" />
                    Mendorong partisipasi aktif warga dalam pembangunan desa
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nilai-Nilai */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Nilai-Nilai <span className="text-green-600">Kami</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Prinsip yang menjadi landasan setiap kegiatan dan program KIM Jeruklegi
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-orange-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <CardHeader>
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                  <MessageCircle className="h-7 w-7 text-orange-600 group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-xl text-gray-900">Transparansi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Menyampaikan informasi secara terbuka, jujur, dan dapat dipertanggungjawabkan
                  kepada seluruh masyarakat tanpa terkecuali.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <CardHeader>
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                  <Handshake className="h-7 w-7 text-green-600 group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-xl text-gray-900">Partisipatif</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Melibatkan seluruh elemen masyarakat dalam setiap kegiatan dan pengambilan
                  keputusan untuk pembangunan bersama.
                </p>
              </CardContent>
            </Card>

            <Card className="border-orange-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <CardHeader>
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                  <Heart className="h-7 w-7 text-orange-600 group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-xl text-gray-900">Gotong Royong</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Mengedepankan semangat kebersamaan dan kerja sama dalam setiap upaya pembangunan
                  dan pemberdayaan masyarakat.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Program Unggulan */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-orange-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Program <span className="text-orange-600">Unggulan</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Berbagai program yang kami jalankan untuk kemajuan masyarakat Jeruklegi
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: MessageCircle,
                title: "Sosialisasi Kebijakan",
                description: "Menyampaikan informasi kebijakan pemerintah kepada masyarakat dengan bahasa yang mudah dipahami",
                color: "orange",
              },
              {
                icon: BookOpen,
                title: "Literasi Digital",
                description: "Meningkatkan kemampuan masyarakat dalam menggunakan teknologi informasi dan komunikasi",
                color: "green",
              },
              {
                icon: Users,
                title: "Diskusi Publik",
                description: "Mengadakan forum diskusi untuk membahas isu-isu penting yang berkaitan dengan masyarakat",
                color: "orange",
              },
              {
                icon: MessageCircle,
                title: "Media Komunitas",
                description: "Mengelola media komunikasi komunitas untuk menyebarkan informasi positif dan edukatif",
                color: "green",
              },
              {
                icon: BookOpen,
                title: "Pelatihan Keterampilan",
                description: "Memberikan pelatihan keterampilan praktis untuk meningkatkan ekonomi masyarakat",
                color: "orange",
              },
              {
                icon: Users,
                title: "Gotong Royong",
                description: "Mengorganisir kegiatan gotong royong untuk memperkuat solidaritas dan kekompakan masyarakat",
                color: "green",
              },
            ].map((program, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div
                  className={`w-14 h-14 ${
                    program.color === "orange" ? "bg-orange-100" : "bg-green-100"
                  } rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <program.icon
                    className={`h-7 w-7 ${
                      program.color === "orange" ? "text-orange-600" : "text-green-600"
                    }`}
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{program.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
