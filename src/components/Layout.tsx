import TopNavigation from "@/components/TopNavigation";
import BottomMenuBanner from "@/components/BottomMenuBanner";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavigation />
      <main className="flex-grow">{children}</main>
      <BottomMenuBanner />
    </div>
  );
};

export default Layout;
