import type { Metadata } from "next";
import "@fontsource/inter-tight/400.css";
import "@fontsource/inter-tight/500.css";
import "@fontsource/inter-tight/600.css";
import "@fontsource/inter-tight/700.css";
import "@fontsource/ibm-plex-mono/400.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollDirector } from "@/components/ScrollDirector";
const url = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  metadataBase: new URL(url || "https://neat-studio-systems.vercel.app"),
  title: {
    default: "NEAT | Intelligent Design Systems",
    template: "%s | NEAT",
  },
  description:
    "NEAT is an architectural intelligence platform concept bringing contextual model review, intelligent design assistance, and controlled automation into the architecture workflow.",
  robots: { index: !!url, follow: !!url },
  openGraph: {
    title: "NEAT | Intelligent Design Systems",
    description: "Design freely. Build intelligently.",
    images: ["/opengraph-image"],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ScrollDirector />
      </body>
    </html>
  );
}
