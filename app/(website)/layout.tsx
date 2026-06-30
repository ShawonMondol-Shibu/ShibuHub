import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import ContextProvider from "@/components/context/contextProvider";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContextProvider>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </ContextProvider>
  );
}
