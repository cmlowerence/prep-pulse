import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/", // Redirect to landing page if not authenticated
  },
});

export const config = {
  // Protect all routes inside the (protected) folder
  matcher: [
    "/dashboard/:path*", 
    "/syllabus/:path*", 
    "/study/:path*", 
    "/settings/:path*"
  ],
};