import { SidebarProvider } from "@/components/ui/sidebar";
import CustomSidebar from "@/components/custom/custom-sidebar";
import CustomHeaderWrapper from "@/components/custom/custom-header-wrapper";
import DashboardGuard from "@/components/custom/dashboard-guard";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardGuard>
      <SidebarProvider>
        <CustomSidebar />
        <div className="flex flex-col h-screen w-full overflow-hidden">
          <CustomHeaderWrapper />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </SidebarProvider>
    </DashboardGuard>
  );
}
