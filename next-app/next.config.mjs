/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true
      },
      {
        source: "/pages/about.html",
        destination: "/about",
        permanent: true
      },
      {
        source: "/pages/contact.html",
        destination: "/contact",
        permanent: true
      },
      {
        source: "/pages/changelog.html",
        destination: "/changelog",
        permanent: true
      },
      {
        source: "/pages/analytics.html",
        destination: "/analytics",
        permanent: true
      },
      {
        source: "/blog/index.html",
        destination: "/blog",
        permanent: true
      },
      {
        source: "/blog/post.html",
        has: [{ type: "query", key: "slug" }],
        destination: "/blog/:slug",
        permanent: true
      },
      {
        source: "/blog/post.html",
        destination: "/blog",
        permanent: true
      },
      {
        source: "/react-app/index.html",
        destination: "/",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
