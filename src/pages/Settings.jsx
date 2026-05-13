import { useContext, useEffect, useState } from "react";

import DashboardLayout from "../components/layout/Dashboard";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import MobileNav from "../components/layout/MobileNav";
import backgroundImage from "../assets/Background.png";

import { ThemeContext } from "../context/ThemeContext";

function Settings() {
  const { theme } = useContext(ThemeContext);

  const [isOpen, setIsOpen] = useState(true);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleSidebarToggle = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{
        background: theme === "dark" ? "rgb(13, 27, 46)" : "#F6F8FA",
        minHeight: "100vh",
      }}
    >
      <DashboardLayout
        sidebar={
          <Sidebar
            setIsOpen={handleSidebarToggle}
            isOpen={isOpen}
            isMobile={isMobile}
          />
        }
        topbar={
          <Topbar
            isOpen={isOpen}
            setIsOpen={handleSidebarToggle}
            isMobile={isMobile}
          />
        }
        mobilebar={<MobileNav isMobile={isMobile} />}
      >
        <div
          className="p-5"
          style={{
            width: "94%",
            marginLeft: "3%",
            height: "90vh",
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: "center",
            backgroundSize: "1000px",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </DashboardLayout>
    </div>
  );
}

export default Settings;
