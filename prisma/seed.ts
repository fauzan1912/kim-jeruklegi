import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // 1. Seed Admin User
  const adminUsername = "admin"
  const adminPassword = "adminpassword123" // default password
  const hashedPassword = await bcrypt.hash(adminPassword, 10)

  console.log("Seeding admin user...")
  const admin = await prisma.user.upsert({
    where: { username: adminUsername },
    update: {},
    create: {
      username: adminUsername,
      password: hashedPassword,
      name: "Administrator KIM",
    },
  })
  console.log(`Admin user created: ${admin.username}`)

  // 2. Seed Articles from static articles array
  const staticArticles = [
    {
      slug: "sosialisasi-kebijakan-bantuan-langsung-tunai-2026",
      title: "KIM Jeruklegi Gelar Sosialisasi Kebijakan Bantuan Langsung Tunai 2026",
      excerpt: "Kelompok Informasi Masyarakat (KIM) Jeruklegi mengadakan sosialisasi program Bantuan Langsung Tunai (BLT) tahun 2026 yang dihadiri lebih dari 150 warga Dusun Jeruklegi.",
      content: `<p>Kelompok Informasi Masyarakat (KIM) Jeruklegi berhasil menggelar kegiatan sosialisasi kebijakan program Bantuan Langsung Tunai (BLT) tahun 2026 pada hari Sabtu, 10 Mei 2026 bertempat di Balai Desa Katongan, Kecamatan Nglipar, Kabupaten Gunungkidul.</p><p>Kegiatan yang dihadiri oleh lebih dari 150 warga Dusun Jeruklegi ini bertujuan untuk memberikan pemahaman yang lebih baik kepada masyarakat mengenai mekanisme penyaluran BLT, persyaratan penerima, serta prosedur pengaduan jika terjadi kendala.</p><h2>Narasumber dari Dinas Sosial</h2><p>Acara ini menghadirkan narasumber dari Dinas Sosial Kabupaten Gunungkidul yang memaparkan secara detail mengenai program BLT 2026. "Program ini merupakan bentuk perhatian pemerintah terhadap masyarakat yang membutuhkan. Kami berharap dengan sosialisasi ini, masyarakat dapat memahami hak dan kewajibannya," ujar Bapak Suroto, perwakilan Dinas Sosial.</p><h2>Antusiasme Warga Tinggi</h2><p>Antusiasme warga dalam mengikuti sosialisasi ini sangat tinggi. Banyak pertanyaan yang diajukan seputar kriteria penerima bantuan dan jadwal pencairan. Ketua KIM Jeruklegi, Ibu Sri Mulyani, menyampaikan bahwa kegiatan seperti ini akan terus dilakukan secara rutin.</p><p>"Kami di KIM Jeruklegi berkomitmen untuk menjadi jembatan informasi antara pemerintah dan masyarakat. Sosialisasi ini adalah salah satu bentuk nyata kontribusi kami," kata Ibu Sri Mulyani.</p><h2>Tindak Lanjut</h2><p>Sebagai tindak lanjut, KIM Jeruklegi akan membuka posko informasi di setiap RT untuk membantu warga yang memiliki pertanyaan lebih lanjut mengenai program BLT 2026. Posko ini akan beroperasi selama satu bulan ke depan.</p>`,
      category: "Berita",
      author: "Tim Redaksi KIM",
      date: new Date("2026-05-10"),
      image: "/sosialisasi-kebijakan.png",
      readTime: 5,
    },
    {
      slug: "pelatihan-literasi-digital-untuk-warga-jeruklegi",
      title: "Pelatihan Literasi Digital untuk Warga Jeruklegi: Mengenal Internet Sehat",
      excerpt: "KIM Jeruklegi mengadakan pelatihan literasi digital bagi warga, khususnya lansia dan ibu rumah tangga, untuk mengenali informasi hoaks dan menggunakan internet secara bijak.",
      content: `<p>Dalam rangka meningkatkan pemahaman masyarakat terhadap dunia digital, KIM Jeruklegi menyelenggarakan Pelatihan Literasi Digital bertajuk "Mengenal Internet Sehat" pada Minggu, 18 Mei 2026 di Aula Kelurahan Katongan.</p><h2>Sasaran Utama: Lansia dan Ibu Rumah Tangga</h2><p>Pelatihan ini secara khusus menyasar kelompok lansia dan ibu rumah tangga yang selama ini rentan terhadap penyebaran informasi hoaks melalui media sosial, khususnya WhatsApp. Sebanyak 45 peserta hadir dan mengikuti kegiatan dari pagi hingga sore hari.</p><p>Materi yang disampaikan meliputi cara mengenali berita hoaks, etika bermedia sosial, keamanan data pribadi di internet, serta cara melaporkan konten negatif.</p><h2>Praktik Langsung</h2><p>Para peserta tidak hanya mendapatkan teori, tetapi juga praktik langsung menggunakan smartphone mereka. Relawan KIM dengan sabar membimbing peserta satu per satu, mulai dari cara cek fakta menggunakan website resmi, hingga cara mengatur privasi akun media sosial.</p><p>"Saya sekarang jadi tahu kalau tidak semua berita di WhatsApp itu benar. Harus dicek dulu kebenarannya," ungkap Ibu Sumarni (62), salah satu peserta pelatihan.</p><h2>Kolaborasi dengan Kominfo</h2><p>Kegiatan ini merupakan hasil kolaborasi KIM Jeruklegi dengan Dinas Komunikasi dan Informatika Kabupaten Gunungkidul. Ke depannya, pelatihan serupa akan diadakan secara berkala setiap dua bulan sekali.</p>`,
      category: "Edukasi",
      author: "Andi Prasetyo",
      date: new Date("2026-05-18"),
      image: "/literasi-digital.png",
      readTime: 4,
    },
    {
      slug: "gotong-royong-bersihkan-lingkungan-dusun-jeruklegi",
      title: "Gotong Royong Bersihkan Lingkungan Dusun Jeruklegi Sambut Musim Penghujan",
      excerpt: "Warga Dusun Jeruklegi bersama KIM mengadakan gotong royong membersihkan selokan, jalan, dan fasilitas umum untuk mencegah banjir dan penyakit di musim penghujan.",
      content: `<p>Menjelang datangnya musim penghujan, warga Dusun Jeruklegi bersama anggota Kelompok Informasi Masyarakat (KIM) mengadakan kegiatan gotong royong bersih-bersih lingkungan pada Jumat, 23 Mei 2026.</p><h2>Lebih dari 200 Warga Berpartisipasi</h2><p>Kegiatan yang dimulai sejak pukul 07.00 WIB ini diikuti oleh lebih dari 200 warga dari berbagai RT di Dusun Jeruklegi. Para warga bergotong royong membersihkan selokan, memotong rumput liar, memperbaiki jalan setapak, serta membersihkan fasilitas umum seperti mushola dan balai pertemuan.</p><h2>Pencegahan Banjir dan Penyakit</h2><p>"Tujuan utama kegiatan ini adalah pencegahan. Dengan selokan yang bersih dan lingkungan yang terawat, kita bisa mengurangi risiko banjir dan perkembangbiakan nyamuk yang menyebabkan demam berdarah," jelas Pak Bambang, koordinator kegiatan dari KIM Jeruklegi.</p><p>Selain membersihkan lingkungan, warga juga melakukan penanaman pohon di beberapa titik yang rawan longsor. Sebanyak 50 bibit pohon jati dan mahoni ditanam di sepanjang tebing di area Dusun Jeruklegi.</p><h2>Mempererat Kebersamaan</h2><p>Kegiatan gotong royong ini tidak hanya bermanfaat dari sisi kebersihan, tetapi juga mempererat tali silaturahmi antar warga. Setelah selesai bekerja, warga menikmati makan siang bersama yang disiapkan oleh ibu-ibu PKK setempat.</p><p>"Ini yang namanya gotong royong sejati. Semua bekerja bersama, tanpa memandang usia atau jabatan. Inilah semangat masyarakat Jeruklegi," tutur Kepala Dusun Jeruklegi.</p>`,
      category: "Kegiatan",
      author: "Tim Redaksi KIM",
      date: new Date("2026-05-23"),
      image: "/gotong-royong.png",
      readTime: 4,
    },
    {
      slug: "pemeriksaan-kesehatan-gratis-untuk-warga",
      title: "KIM Jeruklegi Fasilitasi Pemeriksaan Kesehatan Gratis untuk Warga",
      excerpt: "Bekerjasama dengan Puskesmas Nglipar, KIM Jeruklegi mengadakan pemeriksaan kesehatan gratis meliputi cek tekanan darah, gula darah, dan konsultasi gizi.",
      content: `<p>KIM Jeruklegi bekerjasama dengan Puskesmas Kecamatan Nglipar menyelenggarakan kegiatan pemeriksaan kesehatan gratis untuk seluruh warga Dusun Jeruklegi pada Selasa, 6 Mei 2026 di Balai Dusun Jeruklegi.</p><h2>Layanan Kesehatan Lengkap</h2><p>Pemeriksaan yang diberikan meliputi pengecekan tekanan darah, kadar gula darah, kolesterol, asam urat, serta konsultasi gizi. Selain itu, tersedia juga layanan konsultasi kesehatan umum dengan dokter dari Puskesmas Nglipar.</p><p>Sebanyak 120 warga memanfaatkan layanan kesehatan gratis ini, mayoritas adalah warga lansia dan ibu hamil.</p><h2>Deteksi Dini Penyakit</h2><p>"Banyak penyakit yang bisa dicegah jika terdeteksi sejak dini. Melalui kegiatan ini, kami berharap warga dapat mengetahui kondisi kesehatannya dan melakukan tindakan pencegahan lebih awal," ujar dr. Ratna, dokter dari Puskesmas Nglipar.</p><p>Dari hasil pemeriksaan, ditemukan beberapa warga yang memiliki tekanan darah tinggi dan kadar gula darah di atas normal. Mereka akan mendapat pendampingan kesehatan lanjutan dari pihak Puskesmas.</p><h2>Peran KIM sebagai Fasilitator</h2><p>Ketua KIM Jeruklegi menjelaskan bahwa peran KIM tidak hanya terbatas pada penyebaran informasi, tetapi juga memfasilitasi kegiatan-kegiatan yang bermanfaat bagi masyarakat. "Kesehatan adalah fondasi dari segala aktivitas. Masyarakat yang sehat akan lebih produktif dan berdaya," tegasnya.</p>`,
      category: "Kegiatan",
      author: "Siti Nurhaliza",
      date: new Date("2026-05-06"),
      image: "/kesehatan-masyarakat.png",
      readTime: 4,
    },
    {
      slug: "pelatihan-kewirausahaan-bagi-pemuda-jeruklegi",
      title: "Pelatihan Kewirausahaan Bagi Pemuda Jeruklegi: Membangun Ekonomi Kreatif Desa",
      excerpt: "KIM Jeruklegi mengadakan pelatihan kewirausahaan untuk pemuda desa, fokus pada ekonomi kreatif, pemasaran digital, dan pengelolaan usaha kecil.",
      content: `<p>Kelompok Informasi Masyarakat (KIM) Jeruklegi menyelenggarakan Pelatihan Kewirausahaan bagi pemuda Dusun Jeruklegi bertajuk "Membangun Ekonomi Kreatif Desa" pada 15-16 Mei 2026 di Balai Desa Katongan.</p><h2>30 Pemuda Antusias Mengikuti</h2><p>Pelatihan yang berlangsung selama dua hari ini diikuti oleh 30 pemuda dari berbagai RT di Dusun Jeruklegi. Materi yang disampaikan meliputi identifikasi peluang usaha, pembuatan rencana bisnis sederhana, teknik pemasaran digital melalui media sosial, serta pengelolaan keuangan usaha kecil.</p><h2>Narasumber Berpengalaman</h2><p>Pelatihan ini menghadirkan narasumber dari kalangan praktisi bisnis and akademisi. Salah satunya adalah Mas Doni, seorang pengusaha muda asal Gunungkidul yang berhasil memasarkan produk kerajinan lokal ke pasar internasional melalui platform e-commerce.</p><p>"Potensi Dusun Jeruklegi sangat besar. Ada kerajinan bambu, olahan makanan tradisional, dan wisata alam yang bisa dikembangkan. Tinggal bagaimana kita mengemasnya dengan baik," ujar Mas Doni.</p><h2>Output Pelatihan</h2><p>Di akhir pelatihan, para peserta diminta membuat proposal bisnis sederhana. Lima proposal terbaik akan mendapat pendampingan intensif dari KIM Jeruklegi selama tiga bulan ke depan, termasuk bantuan akses modal dari program pemerintah.</p><p>"Kami ingin pemuda Jeruklegi tidak hanya menjadi pekerja, tetapi juga pencipta lapangan kerja. Ini investasi untuk masa depan desa kita," kata koordinator program KIM Jeruklegi.</p>`,
      category: "Edukasi",
      author: "Andi Prasetyo",
      date: new Date("2026-05-16"),
      image: "/pelatihan-pemuda.png",
      readTime: 5,
    },
    {
      slug: "musyawarah-desa-perencanaan-pembangunan-2027",
      title: "Musyawarah Desa: KIM Jeruklegi Tampung Aspirasi Warga untuk Pembangunan 2027",
      excerpt: "KIM Jeruklegi mengadakan musyawarah desa untuk menampung aspirasi dan usulan warga terkait program pembangunan desa tahun 2027.",
      content: `<p>Kelompok Informasi Masyarakat (KIM) Jeruklegi sukses menyelenggarakan Musyawarah Desa (Musdes) dalam rangka perencanaan pembangunan tahun 2027 pada Kamis, 22 Mei 2026 di Balai Desa Katongan, Kecamatan Nglipar.</p><h2>Forum Aspirasi Warga</h2><p>Musyawarah ini dihadiri oleh perwakilan setiap RT, tokoh masyarakat, tokoh agama, kelompok perempuan, dan kelompok pemuda. Total peserta yang hadir mencapai 85 orang. KIM Jeruklegi berperan sebagai fasilitator dalam menampung dan mendokumentasikan setiap aspirasi yang disampaikan.</p><h2>Usulan Prioritas Warga</h2><p>Beberapa usulan prioritas yang disampaikan warga antara lain:</p><ul><li>Perbaikan jalan dusun sepanjang 2 kilometer yang rusak akibat longsor</li><li>Pembangunan saluran irigasi untuk lahan pertanian</li><li>Penambahan fasilitas air bersih di RT 05 dan RT 06</li><li>Pembangunan perpustakaan desa digital</li><li>Program pemberdayaan ekonomi untuk kelompok perempuan</li></ul><h2>Dokumentasi dan Tindak Lanjut</h2><p>Seluruh aspirasi warga telah didokumentasikan oleh tim KIM Jeruklegi dan akan disampaikan kepada Pemerintah Desa Katongan sebagai bahan pertimbangan dalam penyusunan Rencana Kerja Pemerintah Desa (RKPDes) tahun 2027.</p><p>"Musyawarah ini adalah bukti bahwa pembangunan harus dari bawah. Aspirasi warga adalah fondasi pembangunan yang berkelanjutan," tutup Kepala Desa Katongan dalam sambutannya.</p>`,
      category: "Pengumuman",
      author: "Tim Redaksi KIM",
      date: new Date("2026-05-22"),
      image: "/musyawarah-desa.png",
      readTime: 5,
    },
  ]

  console.log("Seeding articles...")
  for (const article of staticArticles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {},
      create: {
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        category: article.category,
        author: article.author,
        date: article.date,
        image: article.image,
        readTime: article.readTime,
      },
    })
  }

  console.log("Seeding completed successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
