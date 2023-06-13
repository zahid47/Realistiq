import "../globals.css";
import { Analytics } from "@vercel/analytics/react";
import NextAuthProvider from "@/components/providers/NextAuthProvider";
import Header from "@/components/layout-components/header";
import QueryClientWrapper from "@/components/providers/QueryClientProvider";

export const metadata = {
  title: "Your Path to Homeownership | Realistiq",
  description: "Your Path to Homeownership",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang}>
      <body>
        <NextAuthProvider>
          <QueryClientWrapper>
            <Header />
            <main className="relative z-10">{children}</main>
          </QueryClientWrapper>
        </NextAuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
