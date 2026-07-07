import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Provider from "@/components/provider/Provider";
import { Toaster } from "sonner";
import AuthProvider from "@/components/context/AuthProvider";
import { ThemeProvider } from "@/components/theme-provider";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: {
    default: "ShibuHub - Premium Electronics Store",
    template: "%s | ShibuHub",
  },
  description:
    "Discover premium electronics, smartphones, and digital devices at ShibuHub. Free shipping on orders over $50.",
  keywords: ["electronics", "smartphones", "digital devices", "online store"],
  openGraph: {
    title: "ShibuHub - Premium Electronics Store",
    description: "Discover premium electronics at ShibuHub",
    url: "https://shibuhub.vercel.app",
    siteName: "ShibuHub",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShibuHub",
    description: "Premium Electronics Store",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
        <body className={`${lato.variable} antialiased`}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Provider>{children}</Provider>
            <Toaster position="top-right" richColors />
          </ThemeProvider>
    </AuthProvider>
        </body>
      </html>
  );
}
