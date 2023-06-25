import "../globals.css";
import { Analytics } from "@vercel/analytics/react";
import NextAuthProvider from "@/components/providers/NextAuthProvider";
import Header from "@/components/header";
import QueryClientWrapper from "@/components/providers/QueryClientProvider";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";
import { Inter } from "next/font/google";

const font = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-main",
});

export const metadata = {
  title: "Stress-Free Home Renting | Realistiq",
  description:
    "Find stress-free rental with Realistiq. Explore premium listings, connect with trusted landlords, and experience a hassle-free renting process.",
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
