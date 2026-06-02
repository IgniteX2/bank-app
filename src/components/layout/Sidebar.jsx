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

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "../ui/sidebar";

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
