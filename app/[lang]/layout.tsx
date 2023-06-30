import "../../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import NextAuthProvider from "@/components/providers/NextAuthProvider";
import Header from "@/components/header";
import QueryClientWrapper from "@/components/providers/QueryClientProvider";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";
import { Inter } from "next/font/google";
import { siteConfig } from "@/config/site";

const font = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-main",
});

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

interface Props {
  children: React.ReactNode;
  params: { lang: string };
  listingModal?: boolean;
}

export default function RootLayout({ children, params, listingModal }: Props) {
  return (
    <html lang={params.lang} className={font.className}>
      <body>
        <NextAuthProvider>
          <QueryClientWrapper>
            <Header />
            <main>
              {children}
              {listingModal}
            </main>
            <NextTopLoader color="#6d28d9" shadow={false} height={4} />
            <Toaster />
          </QueryClientWrapper>
        </NextAuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
