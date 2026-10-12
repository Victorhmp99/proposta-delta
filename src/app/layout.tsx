import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { ContentProvider } from "@/content/ContentContext";
import { EditModeButton } from "@/components/editor/EditModeButton";

const display = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Delta Soluções — Proposta Comercial",
  description:
    "Estratégia que conecta marketing e vendas. Diagnóstico, processo comercial, posicionamento e aquisição integrados.",
};

export const viewport: Viewport = {
  themeColor: "#040b22",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-mist">
        <ContentProvider>
          {children}
          <EditModeButton />
        </ContentProvider>
      </body>
    </html>
  );
}
