import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useUserStore } from "@/stores/useUserStore";

import {
  Bell,
  ChevronRight,
  CreditCard,
  LogOut,
  UserPen,
  Settings,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserDetailsSkeleton from "../../skeletons/userDetailsSkeleton";

import { useSidebar } from "@/components/ui/sidebar";

import { Home, Headset, Send, Logs } from "lucide-react";
import { useAuth } from "@/context/useAuth";

function AppSidebar() {
  const { isMobile } = useSidebar();
  const { state } = useSidebar();

  const { theme } = useContext(ThemeContext);
  const user = useUserStore((state) => state.user);
  const initials = user?.fullName?.slice(0, 2).toUpperCase();

  const isLoading = useUserStore((state) => state.isLoading);
  const navigate = useNavigate();
  const { logout } = useAuth();

  console.log(user);

  // if (isLoading) return <p>Loading...</p>;

  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: Home,
      tooltip: "Dashboard",
    },
    {
      label: "Transfer",
      path: "/transfer",
      icon: Send,
      tooltip: "Transfer",
    },
    {
      label: "Transactions",
      path: "/transactions",
      icon: Logs,
      tooltip: "Transations",
    },
    {
      label: "Settings",
      path: "/settings",
      icon: Settings,
      tooltip: "Settings",
    },
    {
      label: "Get Help",
      path: "/help",
      icon: Headset,
      tooltip: "Help",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Sidebar collapsible="icon" className=" border-r border-gray-200 shadow-sm">
      <SidebarContent
        style={{ paddingLeft: "5%", paddingTop: "10%" }}
        className="flex flex-col justify-between bg-gray-50  px-5 py-6"
      >
        <div>
          <SidebarGroup className="pt-2">
            <SidebarGroupLabel
              style={{ marginBottom: "10%" }}
              className="my-4 text-md text-gray-500 "
            >
              <div className="flex items-center gap-2 font-semibold">
                ⚡ IGNITEX BANK
              </div>
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="flex flex-col gap-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <SidebarMenuItem key={item.path}>
                      <NavLink to={item.path} end>
                        {({ isActive }) => (
                          <SidebarMenuButton
                            tooltip={item.tooltip}
                            style={{ paddingLeft: "10px" }}
                            className={`w-[90%] cursor-pointer transition-colors  ${
                              isActive
                                ? "bg-gray-100 text-gray-700 rounded-none "
                                : "text-gray-900 hover:bg-gray-100"
                            }`}
                          >
                            <Icon className="h-5 w-5 shrink-0" />

                            <span className="text-[14px]/[24px] group-data-[collapsible=icon]:hidden">
                              {item.label}
                            </span>
                          </SidebarMenuButton>
                        )}
                      </NavLink>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        <div className="p-2">
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  {isLoading ? (
                    <UserDetailsSkeleton />
                  ) : (
                    <DropdownMenuTrigger
                      style={{ marginBottom: "10%" }}
                      className="flex w-full items-center gap-2 rounded-md px-2 py-2 hover:bg-gray-100 "
                    >
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback className="bg-gray-200">
                          {initials}
                        </AvatarFallback>
                      </Avatar>

                      <div className="grid flex-1 text-left text-sm leading-tight ">
                        <span className="truncate font-medium text-[12px]">
                          {user?.fullName}
                        </span>
                        <span className="truncate text-[10px]">
                          {user?.email}
                        </span>
                      </div>

                      <ChevronRight
                        style={{ padding: "10px", marginRight: "10px" }}
                        className="ml-auto size-8 bg-white rounded-full text-gray-500 shadow-lg font-extrabold"
                      />
                    </DropdownMenuTrigger>
                  )}

                  <DropdownMenuContent
                    className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-sm border-none ring-0 shadow-2xl bg-white"
                    side={isMobile ? "bottom" : "right"}
                    align="end"
                    sideOffset={4}
                  >
                    {/* USER HEADER */}
                    <DropdownMenuGroup>
                      <div
                        style={{
                          paddingLeft: "5%",
                          paddingBottom: "3%",
                          paddingTop: "3%",
                        }}
                        className="flex items-center gap-2 px-2 py-2 text-sm"
                      >
                        <Avatar className="h-8 w-8 rounded-lg">
                          <AvatarImage src={user?.avatar} />
                          <AvatarFallback className="bg-gray-100">
                            {initials}
                          </AvatarFallback>
                        </Avatar>

                        <div className="grid flex-1 text-left">
                          <span className="font-medium">{user?.fullName}</span>
                        </div>
                      </div>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator className="bg-gray-200" />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        style={{
                          paddingLeft: "5%",
                          paddingBottom: "3%",
                          paddingTop: "3%",
                          cursor: "pointer",
                        }}
                      >
                        <UserPen className="mr-2 h-4 w-4" />
                        Profile
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        style={{
                          paddingLeft: "5%",
                          paddingBottom: "3%",
                          cursor: "pointer",
                        }}
                      >
                        <Bell className="mr-2 h-4 w-4" />
                        Notifications
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="bg-gray-200" />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        style={{
                          paddingLeft: "5%",
                          paddingBottom: "3%",
                          paddingTop: "3%",
                          cursor: "pointer",
                        }}
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        Card Services
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        style={{
                          paddingLeft: "5%",
                          paddingBottom: "3%",
                          cursor: "pointer",
                        }}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="bg-gray-200" />
                    <DropdownMenuGroup className="bg-red-600 text-white">
                      <DropdownMenuItem
                        className="text-white"
                        style={{
                          paddingLeft: "5%",
                          paddingBottom: "3%",
                          paddingTop: "3%",
                          cursor: "pointer",
                        }}
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
