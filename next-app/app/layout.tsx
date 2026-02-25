import "./globals.css";

export const metadata = {
  title: "OCTest",
  description: "OCTest Next App"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" data-theme="dark">
      <head>
        <link rel="stylesheet" href="/assets/site.css" />
      </head>
      <body>
        {children}
        <script src="/assets/analytics-config.js"></script>
        <script src="/assets/analytics.js"></script>
      </body>
    </html>
  );
}
