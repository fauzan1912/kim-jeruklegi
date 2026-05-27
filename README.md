# KIM Jeruklrgi Landing Page

Website landing page untuk Kelompok Informasi Masyarakat (KIM) Jeruklrgi, Cilacap, Jawa Tengah.

## Cara Menjalankan

1. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Jalankan development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Buka browser dan akses:**
   \`\`\`
   http://localhost:3000
   \`\`\`

## Fitur

- ✅ Responsive design untuk semua ukuran layar
- ✅ Mobile-friendly navigation dengan hamburger menu
- ✅ Smooth scrolling navigation
- ✅ Modern UI dengan Tailwind CSS
- ✅ Tema warna oranye dan hijau
- ✅ Section: Hero, Tentang, Program, Kontak
- ✅ Form kontak yang interaktif
- ✅ Social media links
- ✅ SEO optimized

## Teknologi

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - UI components
- **Lucide React** - Icons

## Struktur Proyek

\`\`\`
kim-jeruklrgi-landing/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── textarea.tsx
│   └── theme-provider.tsx
├── lib/
│   └── utils.ts
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
\`\`\`

## Build untuk Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Deployment

Website ini dapat di-deploy ke platform seperti:
- Vercel (recommended)
- Netlify
- Railway
- Heroku

Untuk deploy ke Vercel:
1. Push code ke GitHub
2. Connect repository di Vercel
3. Deploy otomatis akan berjalan
