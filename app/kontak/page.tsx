import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Clock, Send } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kontak",
  description: "Hubungi KIM Jeruklegi - Sampaikan pertanyaan, saran, atau bergabung dengan Kelompok Informasi Masyarakat Jeruklegi.",
}

export default function KontakPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-500 to-orange-500 py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="container px-4 md:px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
              <Mail className="h-4 w-4" />
              Hubungi Kami
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Kontak <span className="text-green-200">KIM Jeruklegi</span>
            </h1>
            <p className="text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
              Jangan ragu untuk menghubungi kami jika ada pertanyaan, saran, atau jika Anda ingin bergabung
              dengan KIM Jeruklegi.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Informasi Kontak</h2>
                <p className="text-gray-600">Anda dapat menghubungi kami melalui beberapa cara berikut:</p>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl hover:bg-orange-50 transition-colors group">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 transition-colors">
                    <MapPin className="h-6 w-6 text-orange-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Alamat</h3>
                    <p className="text-gray-600 mt-1">
                      Dusun Jeruklegi, Desa Katongan, Kecamatan Nglipar
                      <br />
                      Kabupaten Gunungkidul, Yogyakarta
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl hover:bg-green-50 transition-colors group">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-500 transition-colors">
                    <Phone className="h-6 w-6 text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Telepon</h3>
                    <p className="text-gray-600 mt-1">+62 812-3456-7890</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl hover:bg-orange-50 transition-colors group">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 transition-colors">
                    <Mail className="h-6 w-6 text-orange-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600 mt-1">kimjeruklrgi@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl hover:bg-green-50 transition-colors group">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-500 transition-colors">
                    <Clock className="h-6 w-6 text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Jam Operasional</h3>
                    <p className="text-gray-600 mt-1">
                      Senin - Jumat: 08.00 - 16.00 WIB
                      <br />
                      Sabtu: 08.00 - 12.00 WIB
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ikuti Kami di Media Sosial</h3>
                <div className="flex gap-3">
                  <Link
                    href="#"
                    className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white text-gray-600 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <Facebook className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/kim_jeruklegi.katongan/"
                    className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:text-white text-gray-600 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <Instagram className="h-5 w-5" />
                  </Link>
                  <Link
                    href="#"
                    className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-sky-500 hover:text-white text-gray-600 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <Twitter className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-gray-200 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-green-500 text-white p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <Send className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-white">Kirim Pesan</CardTitle>
                      <CardDescription className="text-white/80 mt-1">
                        Sampaikan pertanyaan atau saran Anda
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Nama Lengkap</label>
                      <Input placeholder="Masukkan nama Anda" className="rounded-xl h-11" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <Input type="email" placeholder="email@example.com" className="rounded-xl h-11" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">No. Telepon</label>
                    <Input placeholder="+62 8xx-xxxx-xxxx" className="rounded-xl h-11" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Subjek</label>
                    <Input placeholder="Subjek pesan Anda" className="rounded-xl h-11" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Pesan</label>
                    <Textarea placeholder="Tulis pesan Anda di sini..." rows={5} className="rounded-xl resize-none" />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white rounded-xl h-12 text-base font-semibold shadow-lg shadow-orange-200 hover:shadow-xl transition-all">
                    <Send className="h-4 w-4 mr-2" />
                    Kirim Pesan
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="bg-gray-100">
        <div className="container px-4 md:px-6 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Lokasi Kami</h2>
            <p className="text-gray-600 mt-2">Dusun Jeruklegi, Desa Katongan, Kecamatan Nglipar, Kabupaten Gunungkidul</p>
          </div>
          <div className="w-full h-80 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <iframe
              src="https://maps.google.com/maps?q=dusun%20jeruklegi%2C%20katongan%20Nglipar%20gunungkidul%2C%20nglipar%2C%20gunungkidul%2C%20yogyakarta&t=&z=17&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi KIM Jeruklegi"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
