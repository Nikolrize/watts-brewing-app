import { SidebarProvider } from "@/components/ui/sidebar";
import CustomSidebar from "@/components/custom/custom-sidebar";
import CustomHeaderWrapper from "@/components/custom/custom-header-wrapper";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <CustomSidebar />
      <div className="flex flex-col h-screen w-full overflow-hidden">
        <CustomHeaderWrapper />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
