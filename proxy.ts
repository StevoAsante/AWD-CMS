// file: proxy.ts
import { auth } from "@/auth";

// Check dashboard requests before they reach the page.
export { auth as proxy };

export const config = {
  matcher: ["/dashboard/:path*"],
};
