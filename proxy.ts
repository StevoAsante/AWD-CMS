// file: proxy.ts
import { auth } from "@/auth";

// Check dashboard requests before they reach the page.
export const proxy = auth;

export const config = {
  matcher: ["/dashboard/:path*"],
};
