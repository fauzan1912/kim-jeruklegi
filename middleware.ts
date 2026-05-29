import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
})

export const config = {
  // Melindungi seluruh path admin kecuali /admin/login
  matcher: ["/admin/:path*"],
}
