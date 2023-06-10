import "../globals.css";
import { Analytics } from "@vercel/analytics/react";
import NextAuthProvider from "@/components/NextAuthProvider";

export const metadata = {
  title: "Your Path to Homeownership | Realistiq",
  description: "Your Path to Homeownership",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          {children}
          <Analytics />
        </NextAuthProvider>
      </body>
    </html>
  );
}
