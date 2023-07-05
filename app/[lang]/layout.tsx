import "../../styles/globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import NextTopLoader from "nextjs-toploader";
import { siteConfig } from "@/config/site";
import Header from "@/components/header";
import NextAuthProvider from "@/components/providers/NextAuthProvider";
import QueryClientWrapper from "@/components/providers/QueryClientProvider";
import { Toaster } from "@/components/ui/toaster";

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
  signinModal?: React.ReactNode;
  listingModal?: React.ReactNode;
}

export default function RootLayout({
  children,
  params,
  signinModal,
  listingModal,
}: Props) {
  return (
    <html lang={params.lang} className={font.className}>
      <body>
        <NextAuthProvider>
          <QueryClientWrapper>
            <Header />
            <main>
              {children}
              {signinModal}
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
