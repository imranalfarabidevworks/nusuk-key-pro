import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "NusukKey Pro – Umrah Quiz Key Exchange",
  description: "Copy Nusuk Umrah Quiz keys in one tap and share your own. বাংলা ও English.",
};
export const viewport: Viewport = { themeColor: "#f97316", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
