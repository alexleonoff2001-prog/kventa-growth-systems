import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kventa.org"),
  title: "KVENTA — маркетинг, AI и автоматизация для роста бизнеса",
  description: "KVENTA строит системы привлечения и автоматизации клиентов: Яндекс Директ, сайты, CRM, AI-агенты, контент и бизнес-автоматизация.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "KVENTA Growth Systems",
    title: "KVENTA — маркетинг, AI и автоматизация для роста бизнеса",
    description: "Системы привлечения и автоматизации клиентов — от рекламы и сайта до CRM, AI-агентов и продаж.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">{children}</body>
    </html>
  );
}
