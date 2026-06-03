import { useUserStore } from "../../stores/useUserStore";
import { useEffect } from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../layout/Sidebar";

export default function DashboardLayout({ children, topbar, mobilebar }) {
  const fetchUser = useUserStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />

        <main className="flex flex-1 flex-col">
          <div className="border-b px-4 py-3">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              {topbar}
            </div>
          </div>

          <div className="flex-1 p-4">{children}</div>

          {mobilebar}
        </main>
      </div>
    </SidebarProvider>
  );
}
