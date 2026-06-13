import { useContext, useEffect, useState } from "react";

import DashboardLayout from "../components/layout/Dashboard";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import MobileNav from "../components/layout/MobileNav";
import backgroundImage from "../assets/Background.png";

import { ThemeContext } from "../context/ThemeContext";

import { IoNotificationsOutline } from "react-icons/io5";
import { MdKey, MdShield, MdArrowForwardIos } from "react-icons/md";
import { LuUserCog } from "react-icons/lu";

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
        minHeight: "100vh", maxWidth: "100%"
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
        // topbar={
        //   <Topbar
        //     isOpen={isOpen}
        //     setIsOpen={handleSidebarToggle}
        //     isMobile={isMobile}
        //   />
        // }
        mobilebar={<MobileNav isMobile={isMobile} />}
      >
        {/* <div
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
        ></div> */}

        <div
          style={{
            padding: "25px 35px"
          }}>

          <header
            className="flex items-center justify-between"
            style={{
              marginBottom: "24px"
            }}>

            <div>

              <h1
                className="text-[#1A3A5C] font-bold text-[20px]">
                  Settings
              </h1>

              <p
                className="text-[#6B7280] text-[12px]">
                  Customize and edit essential account settings details.
              </p>

            </div>

            <div
              className="flex items-center gap-6">

              <IoNotificationsOutline 
                className="text-[#1A3A5C] text-[24px] cursor-pointer"
              />

              <button
                className="rounded-lg text-[12px]/[24px] font-bold text-[#FFFFFF] bg-[#a78620] cursor-pointer"
                style={{
                  padding: "6px 14px",
                  // marginTop: "18px",
                  // marginBottom: "10px",
                }}>
                  Save Changes
              </button>

            </div>

          </header>

          <div 
            className="flex items-center justify-between border-b border-[#6B7280]"
            style={{
              marginBottom: "20px",
              padding: "0px 10px"
            }}>
            <ul
              className="flex items-center justify-between w-full text-[#6B7280] text-[12px] cursor-pointer">
              <li>Account</li>
              <li>Settings</li>
              <li>Notifications</li>
              <li>Privacy & Security</li>
            </ul>
            {/* 
            <button>
              Save Changes
            </button> */}
          </div>

          {/* ACCOUNT SETTING */}
          <section
            className="flex justify-between gap-50 w-full">

            {/* PROFILE INFORMATION */}
            <div
              className="flex-1 w-full">

              <h3
                className="text-[#1A3A5C] font-bold">
                  Profile Information
              </h3>

              <div
                className="flex items-center gap-8"
                style={{
                  marginTop: "10px"
                }}>

                <div
                  className="w-18 h-18 bg-[#6B7280] rounded-full">
                  <img src="" alt="" />
                </div>

                <div
                  className="text-[12px] flex items-center gap-4">

                  <button
                    className="bg-[#a78620] border border-[#6B7280] text-[#FFFFFF] rounded-lg cursor-pointer"
                    style={{
                      padding: "6px 8px"
                    }}>
                      Change Photo
                  </button>

                  <button
                    className="text-[#0D1B2E] border border-[#6B7280] rounded-lg cursor-pointer"
                    style={{
                      padding: "6px 8px"
                    }}>
                      Remove
                  </button>

                </div>

              </div>

              <div
                className="flex flex-col"
                style={{
                  marginTop: "20px"
                }}>
                
                <div
                  className="flex flex-col gap-4">

                  <div
                    className="flex items-center justify-between gap-6">

                    <div>

                      <label htmlFor=""
                        className="text-[12px] text-[#6B7280]"
                        >
                          First Name
                      </label>

                      <input type="text" value=""
                        className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg w-full cursor-pointer outline-none text-[#0D1B2E]"
                        style={{ padding: "5px" }}
                      />

                    </div>

                    <div>

                      <label htmlFor=""
                        className="text-[12px] text-[#6B7280]">
                        Last Name
                      </label>

                      <input type="text" value=""
                        className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg w-full cursor-pointer outline-none text-[#0D1B2E]"
                        style={{ padding: "5px" }}
                      />

                    </div>
                  </div>

                  <div>

                    <label htmlFor=""
                      className="text-[12px] text-[#6B7280]">
                      Email Address
                    </label>

                    <input type="email" value=""
                      className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg w-full cursor-pointer outline-none text-[#0D1B2E]"
                        style={{ padding: "5px", marginBottom: "16px" }}
                    />

                  </div>
                  
                </div>

                <div
                  className="flex flex-col gap-4">

                  <div
                    className="flex items-center justify-between gap-6">

                    <div>

                      <label htmlFor=""
                        className="text-[12px] text-[#6B7280]">
                        Phone Number
                      </label>

                      <input type="text" value=""
                        className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg w-full cursor-pointer outline-none text-[#0D1B2E]"
                        style={{ padding: "5px" }}
                      />

                    </div>

                    <div>

                      <label htmlFor=""
                        className="text-[12px] text-[#6B7280]">
                          Date Of Birth
                      </label>

                      <input type="text" value=""
                        className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg w-full cursor-pointer outline-none text-[#0D1B2E]"
                        style={{ padding: "5px" }}
                      />

                    </div>

                  </div>

                  <div>

                    <label htmlFor=""
                      className="text-[12px] text-[#6B7280]">
                        Address
                    </label>

                    <input type="email" value=""
                      className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg w-full cursor-pointer outline-none text-[#0D1B2E]"
                        style={{ padding: "5px" }}
                    />

                  </div>
                  
                </div>

              </div>

            </div>

            {/* ACCOUNT STATUS */}
            <div
            className="w-64 flex flex-col gap-8">

              {/* ACCOUNT STATUS */}
              <div
                className="flex flex-col gap-3">

                <h3
                  className="text-[#1A3A5C] font-bold">
                  Account Status
                </h3>

                <div
                  className="flex items-center justify-between gap-4">

                  <p
                    className="text-[14px] text-[#6B7280]">
                      Verification Status
                  </p>

                  <p
                    className="text-[14px] text-[#27A06E] font-semibold">
                      Verified
                  </p>

                </div>

                <div
                  className="flex items-center justify-between gap-4">

                  <p
                    className="text-[14px] text-[#6B7280]">
                      Account Type
                  </p>

                  <p
                    className="text-[14px] text-[#a78620] font-semibold">
                      Premium
                  </p>

                </div>

                <div
                  className="flex items-center justify-between gap-4">

                  <p
                    className="text-[14px] text-[#6B7280]">
                      Member Since
                  </p>

                  <p
                    className="text-[14px] text-[#1A3A5C] font-semibold">
                      Jan 2023
                  </p>

                </div>

              </div>

              {/* SECURITY */}
              <div
                className="flex flex-col gap-3">

                <h3
                  className="text-[#1A3A5C] font-bold">
                    Security
                </h3>
                
                <div
                  className="flex items-center justify-between gap-4 cursor-pointer">

                  <div
                    className="flex items-center gap-1">

                    <MdKey
                      className="text-[25px] text-[#6B7280]"
                    />

                    <p
                      className="text-[14px] text-[#6B7280]">
                        Change Password
                    </p>

                  </div>

                  <MdArrowForwardIos
                    className="text-[#1A3A5C]"
                  />

                </div>

                <div
                  className="flex items-center justify-between gap-4 cursor-pointer">

                  <div
                    className="flex items-center  gap-1">

                    <MdShield
                      className="text-[25px] text-[#6B7280]"
                    />

                    <p
                      className="text-[14px] text-[#6B7280]">
                        Two-Factor Auth
                    </p>

                  </div>

                  <MdArrowForwardIos
                    className="text-[#1A3A5C]"
                  />
                </div>

                <div
                  className="flex items-center justify-between gap-4 cursor-pointer">
                  
                  <div
                    className="flex items-center gap-1">

                    <LuUserCog
                      className="text-[25px] text-[#6B7280]"
                    />

                    <p
                      className="text-[14px] text-[#6B7280]">
                        Active Sessions
                    </p>

                  </div>

                  <MdArrowForwardIos
                    className="text-[#1A3A5C]"
                  />

                </div>

              </div>

            </div>

          </section>
        </div>

      </DashboardLayout>
    </div>
  );
}

export default Settings;
