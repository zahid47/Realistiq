import "../../styles/globals.css";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import NextTopLoader from "nextjs-toploader";
import { siteConfig } from "@/config/site";
import Providers from "@/components/Providers";
import Header from "@/components/shared/Header";
import { Toaster } from "@/components/ui/toaster";

const font = Poppins({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
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
        <Providers>
          <Header />
          <main>
            {children}
            {signinModal}
            {listingModal}
          </main>
          <NextTopLoader color="#6d28d9" shadow={false} height={4} />
          <Toaster />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
