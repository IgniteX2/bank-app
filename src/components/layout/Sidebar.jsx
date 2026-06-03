//

// import { useContext } from "react";
// import { ThemeContext } from "../../context/ThemeContext";
// import { NavLink } from "react-router-dom";

// import { FiHome, FiHelpCircle, FiLogOut, FiX } from "react-icons/fi";
// import { LiaHeadsetSolid } from "react-icons/lia";
// import { LuPanelRightOpen, LuSettings } from "react-icons/lu";
// import { RiExchangeLine } from "react-icons/ri";

// import userImg from "../../assets/user.jpg";

// import Button from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { ScrollArea } from "@/components/ui/scroll-area";

// const navItems = [
//   { label: "Dashboard", icon: <FiHome />, href: "/dashboard" },
//   { label: "Transactions", icon: <RiExchangeLine />, href: "/transactions" },
// ];

// const otherItems = [
//   { label: "Settings", icon: <LuSettings />, href: "/settings" },
//   { label: "Get Help", icon: <FiHelpCircle />, href: "/help" },
//   { label: "Logout", icon: <FiLogOut />, href: "/logout" },
// ];

// export default function Sidebar({
//   isOpen,
//   setIsOpen,
//   isMobile,
//   userName,
//   userEmail,
// }) {
//   const { theme } = useContext(ThemeContext);

//   if (isMobile) return null;

//   return (
//     <aside
//       className={`h-screen w-72 flex flex-col border-r ${
//         theme === "dark" ? "bg-[#0a1628] border-gray-800" : "bg-white"
//       }`}
//     >
//       {/* HEADER */}
//       <div className="flex items-center justify-between p-4">
//         <div className="flex items-center gap-2 font-semibold">
//           ⚡ IGNITEX BANK
//         </div>

//         <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
//           <LuPanelRightOpen />
//         </Button>
//       </div>

//       <Separator />

//       {/* NAV */}
//       <ScrollArea className="flex-1 px-3 py-4">
//         <p className="text-xs text-muted-foreground mb-2">MAIN</p>

//         <div className="space-y-1">
//           {navItems.map((item) => (
//             <NavLink
//               key={item.label}
//               to={item.href}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
//                   isActive ? "bg-muted font-medium" : "hover:bg-muted/50"
//                 }`
//               }
//             >
//               {item.icon}
//               {item.label}
//             </NavLink>
//           ))}
//         </div>

//         <p className="text-xs text-muted-foreground mt-6 mb-2">OTHER</p>

//         <div className="space-y-1">
//           {otherItems.map((item) => (
//             <NavLink
//               key={item.label}
//               to={item.href}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
//                   isActive ? "bg-muted font-medium" : "hover:bg-muted/50"
//                 }`
//               }
//             >
//               {item.icon}
//               {item.label}
//             </NavLink>
//           ))}
//         </div>
//       </ScrollArea>

//       {/* SUPPORT CARD */}
//       <div className="p-4">
//         <Card className="p-4 space-y-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <LiaHeadsetSolid className="text-xl" />
//               <h2 className="text-sm font-semibold">Need Support?</h2>
//             </div>

//             <Button variant="ghost" size="icon">
//               <FiX />
//             </Button>
//           </div>

//           <p className="text-xs text-muted-foreground">
//             Connect with one of our experts to get support.
//           </p>

//           <Button className="w-full text-xs">Contact Us</Button>
//         </Card>
//       </div>

//       {/* USER */}
//       <div className="p-4 flex items-center gap-3 border-t">
//         <Avatar>
//           <AvatarImage src={userImg} />
//           <AvatarFallback>{userName?.[0] || "U"}</AvatarFallback>
//         </Avatar>

//         <div>
//           <p className="text-sm font-medium">{userName}</p>
//           <p className="text-xs text-muted-foreground">{userEmail}</p>
//         </div>
//       </div>
//     </aside>
//   );
// }
import { useState } from "react";
import { NavLink } from "react-router-dom";
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

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LiaHeadsetSolid } from "react-icons/lia";
import { FiX } from "react-icons/fi";

import {
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
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

import { useSidebar } from "@/components/ui/sidebar";

import { Home, Headset, Send, CircleQuestionMark, Logs } from "lucide-react";

function AppSidebar() {
  const { isMobile } = useSidebar();
  const { state } = useSidebar();
  const [user, setUser] = useState(null);
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
    {
      label: "FAQ",
      path: "/faq",
      icon: CircleQuestionMark,
      tooltip: "FAQ",
    },
  ];

  const handleLogout = () => {
    console.log("Logout clicked");
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
                                ? "bg-gray-200 text-gray-700 rounded-none "
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

              {state !== "collapsed" ? (
                <div style={{ marginTop: "20%" }} className=" p-2">
                  <Card className="mx-auto w-[90%] space-y-4 rounded-lg border-none ring-0 bg-white p-4 shadow-sm">
                    <div
                      className="flex items-start justify-between"
                      style={{
                        marginLeft: "10px",
                        marginRight: "10px",
                        paddingTop: "10px",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <LiaHeadsetSolid className="h-5 w-5 text-cyan-700" />

                        <h2 className="text-sm font-semibold text-slate-800">
                          Need Support?
                        </h2>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-slate-500 hover:bg-slate-100 self-center"
                      >
                        <FiX className="h-4 w-4" />
                      </Button>
                    </div>

                    <p
                      style={{ paddingLeft: "10px", paddingRight: "10px" }}
                      className="text-xs leading-relaxed text-slate-500 "
                    >
                      Connect with one of our experts to get support.
                    </p>

                    <Button
                      style={{
                        marginLeft: "2%",
                        width: "96%",
                        marginBottom: "2%",
                      }}
                      className=" bg-gray-300 hover:bg-gray-500 hover:text-white"
                    >
                      Contact Us
                    </Button>
                  </Card>
                </div>
              ) : null}
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        <div className="p-2">
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    style={{ marginBottom: "10%" }}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-2 hover:bg-gray-100 "
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">{user?.name}</span>
                      <span className="truncate text-xs">{user?.email}</span>
                    </div>

                    <ChevronsUpDown className="ml-auto size-4" />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-sm border-none ring-0 shadow-xl bg-white"
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
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <div className="grid flex-1 text-left">
                          <span className="font-medium">{user?.name}</span>
                          <span className="text-xs">{user?.email}</span>
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
                        <Sparkles className="mr-2 h-4 w-4" />
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
