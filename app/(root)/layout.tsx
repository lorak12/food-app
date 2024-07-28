import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-80px)] px-24 py-12">{children}</main>
      <Footer />
    </>
  );
}
