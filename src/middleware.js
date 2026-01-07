import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

const intlMiddleware = createMiddleware(routing);
// rate limiting
class RateLimiter {
  constructor() {
    this.requests = new Map();
    this.windowMs = 60 * 1000; // 1 minute window
    this.maxRequests = 100; // Default max requests per window

    // Clean up old entries every 5 minutes to prevent memory leaks
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  cleanup() {
    const now = Date.now();
    for (const [key, data] of this.requests.entries()) {
      if (now - data.resetTime > this.windowMs) {
        this.requests.delete(key);
      }
    }
  }

  isRateLimited(identifier, maxRequests = this.maxRequests) {
    const now = Date.now();
    const requestData = this.requests.get(identifier);

    if (!requestData || now - requestData.resetTime > this.windowMs) {
      // New window
      this.requests.set(identifier, {
        count: 1,
        resetTime: now,
      });
      return false;
    }

    if (requestData.count >= maxRequests) {
      return true;
    }

    requestData.count++;
    return false;
  }

  getRemainingTime(identifier) {
    const requestData = this.requests.get(identifier);
    if (!requestData) return 0;

    const elapsed = Date.now() - requestData.resetTime;
    return Math.max(0, Math.ceil((this.windowMs - elapsed) / 1000));
  }
}

const rateLimiter = new RateLimiter();

// Logs security events for monitoring and incident response
// In production, integrate with Datadog, Sentry, LogTail, etc.
class SecurityLogger {
  constructor() {
    this.events = [];
  }

  log(event) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      ...event,
    };

    // Store in memory for development
    this.events.push(logEntry);

    // Keep only last 1000 events
    if (this.events.length > 1000) {
      this.events.shift();
    }

    // TODO: In production, send to logging service:
    // await fetch(process.env.LOGGING_ENDPOINT, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(logEntry)
    // });
  }

  authFailure(ip, pathname, reason) {
    this.log({
      type: "AUTH_FAILURE",
      ip,
      pathname,
      reason,
      severity: "medium",
    });
  }

  rateLimitHit(ip, pathname, endpoint) {
    this.log({
      type: "RATE_LIMIT_HIT",
      ip,
      pathname,
      endpoint,
      severity: "high",
    });
  }

  suspiciousActivity(ip, pathname, reason) {
    this.log({
      type: "SUSPICIOUS_ACTIVITY",
      ip,
      pathname,
      reason,
      severity: "high",
    });
  }

  authBypassAttempt(ip, pathname, method) {
    this.log({
      type: "AUTH_BYPASS_ATTEMPT",
      ip,
      pathname,
      method,
      severity: "critical",
    });
  }
}

const securityLogger = new SecurityLogger();

// ============================================================================
// RATE LIMITING MIDDLEWARE
// ============================================================================
function checkRateLimit(req, maxRequests = 100) {
  // Extract client IP (Vercel provides these headers)
  const ip =
    req.ip ||
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    "unknown";

  // Create unique identifier per IP + pathname
  const identifier = `${ip}:${req.nextUrl.pathname}`;

  if (rateLimiter.isRateLimited(identifier, maxRequests)) {
    const retryAfter = rateLimiter.getRemainingTime(identifier);

    // Log rate limit violations - may indicate attack
    securityLogger.rateLimitHit(ip, req.nextUrl.pathname, identifier);

    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": retryAfter.toString(),
          "X-RateLimit-Limit": maxRequests.toString(),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  return null;
}

// path normalization
function normalizePathname(pathname) {
  let normalized = pathname.replace(/\/+$/, "");
  normalized = normalized.toLowerCase();
  normalized = normalized.replace(/\/+/g, "/");
  return normalized;
}
function isPathMatch(pathname, targetPath, locale = null) {
  const normalized = normalizePathname(pathname);
  const normalizedTarget = normalizePathname(targetPath);

  if (locale) {
    const localizedPath = `/${locale}${normalizedTarget}`;
    return normalized === localizedPath || normalized === normalizedTarget;
  }

  return normalized === normalizedTarget;
}

function hasAuthToken(req) {
  const { searchParams } = req.nextUrl;
  const token_hash = searchParams.get("token_hash");
  const code = searchParams.get("code");
  const type = searchParams.get("type");

  // Check if this is an auth-related request with tokens
  return (
    !!(token_hash || code) &&
    (type === "email_change" || type === "recovery" || code)
  );
}

// authenticate pages middleware
const supaMiddleware = async (req) => {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  // Extract IP for logging
  const ip =
    req.ip ||
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    "unknown";

  try {
    if (error || !session || !session.user) {
      // Log authentication failures for security monitoring
      securityLogger.authFailure(
        ip,
        req.nextUrl.pathname,
        error?.message || "No session"
      );

      const locale = req.nextUrl.pathname.split("/")[1] || "fr";
      const loginUrl = new URL(`/${locale}/login`, req.url);
      loginUrl.searchParams.set("message", "auth_required");
      return NextResponse.redirect(loginUrl);
    }
    const pathname = req.nextUrl.pathname;
    const locale = pathname.split("/")[1] || "fr";

    if (pathname === `/${locale}/member` || pathname === `/member`) {
      const accountUrl = new URL(`/${locale}/member/account`, req.url);
      return NextResponse.redirect(accountUrl);
    }
    return res;
  } catch (error) {
    // Log exceptions for debugging and security monitoring
    securityLogger.authFailure(
      ip,
      req.nextUrl.pathname,
      `Exception: ${error.message}`
    );

    console.error("Auth middleware error:", error);
    const locale = req.nextUrl.pathname.split("/")[1] || "fr";
    const loginUrl = new URL(`/${locale}/login`, req.url);
    loginUrl.searchParams.set("message", "auth_required");
    return NextResponse.redirect(loginUrl);
  }
};

//  checks authentication for API routes
const apiMiddleware = async (req) => {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  const ip =
    req.ip ||
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (error || !session || !session.user) {
    securityLogger.authFailure(
      ip,
      req.nextUrl.pathname,
      `API: ${error?.message || "No session"}`
    );
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return res;
};

// main middleware
export default function middleWareHandler(req) {
  const pathname = req.nextUrl.pathname;
  const normalizedPath = normalizePathname(pathname);

  const publicPaths = [
    "/auth-pages/auth-confirm",
    "/auth-pages/auth-error",
    "/auth-pages/auth-pwreset",
    "/auth-pages/email-verified",
    "/login",
    "/signup",
    "/pwRecovery",
  ];

  const publicApiPaths = [
    "/api/auth/callback",
    "/api/auth/confirm",
    "/api/contact",
    "/api/login",
    "/api/startDate",
    "/auth/callback",
    "/auth/confirm",
  ];

  // api route proection
  if (normalizedPath.startsWith("/api")) {
    const isPublicApi = publicApiPaths.some((path) =>
      normalizedPath.startsWith(normalizePathname(path))
    );

    if (isPublicApi) {
      // Strict rate limiting for public APIs (attack targets)
      const publicApiRateLimit = checkRateLimit(req, 20); // 20 req/min
      if (publicApiRateLimit) return publicApiRateLimit;
      return NextResponse.next();
    }

    // More lenient rate limiting for protected APIs (authenticated users)
    const protectedApiRateLimit = checkRateLimit(req, 60); // 60 req/min
    if (protectedApiRateLimit) return protectedApiRateLimit;
    return apiMiddleware(req);
  }

  // public path check
  const isPublicPath = publicPaths.some((path) => {
    return routing.locales.some(
      // (locale) => pathname === `/${locale}${path}` || pathname === path
      (locale) => isPathMatch(pathname, path, locale)
    );
  });

  if (isPublicPath) {
    // Rate limit form pages more strictly
    const formPages = ["/login", "/signup", "/pwRecovery"];
    const isFormPage = formPages.some((page) =>
      routing.locales.some(
        (locale) =>
          normalizedPath === `/${locale}${page}` || normalizedPath === page
      )
    );
    if (isFormPage) {
      const formRateLimit = checkRateLimit(req, 30); // 30 req/min for form pages
      if (formRateLimit) return formRateLimit;
    }
    return intlMiddleware(req);
  }

  // member area protection
  const isMemberPath = normalizedPath.includes("/member");

  if (isMemberPath) {
    if (hasAuthToken(req)) {
      // Apply rate limiting but don't require session
      const tokenRateLimit = checkRateLimit(req, 30); // 30 req/min for token requests
      if (tokenRateLimit) return tokenRateLimit;
      return intlMiddleware(req);
    }
    // Apply rate limiting to member pages (120 req/min)
    const memberRateLimit = checkRateLimit(req, 120);
    if (memberRateLimit) return memberRateLimit;

    // require authentication
    return supaMiddleware(req);
  }

  //default is internationalization
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
  // matcher: ["/((?!_next|_vercel|.*\\..*|api).*)", "/api/:path*"],
};
