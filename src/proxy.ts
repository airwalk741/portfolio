import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Next.js 16 renamed the `middleware` file convention to `proxy`.
 * next-intl still ships the handler factory under `next-intl/middleware`;
 * the returned request handler is what the `proxy` convention expects.
 */
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals and anything with a file extension so
  // static assets are never redirected through the locale prefix.
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
