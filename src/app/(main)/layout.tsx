import { MainNavbar } from "@/components/navbar/mainNavbar";
import { Footer } from "@/components/footer/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainNavbar />
      <main className="w-full flex-1">{children}</main>
      <Footer />
    </>
  );
}
