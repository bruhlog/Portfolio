/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // ✅ Content Security Policy (safe for reCAPTCHA + analytics)
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com https://plausible.io;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https:;
              connect-src 'self' https://www.google.com https://plausible.io;
              frame-src https://www.google.com;
            `
              .replace(/\s{2,}/g, " ")
              .trim(),
          },

          // ✅ Prevent clickjacking
          {
            key: "X-Frame-Options",
            value: "DENY",
          },

          // ✅ Improve origin isolation
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },

          // ✅ Extra hardening (safe)
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
