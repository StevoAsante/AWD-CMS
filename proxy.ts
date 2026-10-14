// file: proxy.ts
// Check dashboard requests before they reach the page.
export { auth as proxy } from "@/auth";

export const config = {
  matcher: ["/dashboard/:path*"],
  
};
