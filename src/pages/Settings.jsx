import { useContext, useEffect, useState } from "react";

import DashboardLayout from "../components/layout/Dashboard";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import MobileNav from "../components/layout/MobileNav";
import backgroundImage from "../assets/Background.png";

import { ThemeContext } from "../context/ThemeContext";

import { IoNotificationsOutline, IoColorPalette, IoWarning } from "react-icons/io5";
import { MdKey, MdShield, MdArrowForwardIos } from "react-icons/md";
import { LuUserCog } from "react-icons/lu";
import { BiWorld } from "react-icons/bi";

function Settings() {
  const { theme } = useContext(ThemeContext);

  const [isOpen, setIsOpen] = useState(true);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [openMenu, setOpenMenu] = useState("account");

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
            padding: "25px"
          }}>

          <header
            className="flex items-center justify-between w-full gap-4"
            style={{
              marginBottom: "24px"
            }}>

            <div
              className="flex-1">

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
              className="flex items-center gap-6 max-md:gap-2">

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
              className="flex items-center justify-between w-150 max-md:w-full text-[#6B7280] text-[12px] cursor-pointer">

              <li
                onClick={() => setOpenMenu("account")}
                className={`${openMenu === "account" ? "text-[#1A3A5C] font-bold" : null}`}
                >
                  Account
              
              </li>
              <li
                onClick={() => setOpenMenu("settings")}
                className={`${openMenu === "settings" ? "text-[#1A3A5C] font-bold" : null}`}>
                  Settings
              </li>

              <li
                onClick={() => setOpenMenu("notifications")}
                className={`${openMenu === "notifications" ? "text-[#1A3A5C] font-bold" : null}`}>
                  Notifications
              </li>

              <li
                onClick={() => setOpenMenu("privacy")}
                className={`${openMenu === "privacy" ? "text-[#1A3A5C] font-bold" : null}`}>
                  Privacy & Security
              </li>

            </ul>
            
            {/* 
            <button>
              Save Changes
            </button> */}
          </div>

          {/* ACCOUNT SETTING */}
          {
            openMenu === "account" && (
              <section
                className="flex max-md:flex-col justify-between gap-50 max-md:gap-10 w-full"
                style={{
                  marginBottom: "80px"
                }}>

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
                            style={{ padding: "8px 12px" }}
                          />

                        </div>

                        <div>

                          <label htmlFor=""
                            className="text-[12px] text-[#6B7280]">
                            Last Name
                          </label>

                          <input type="text" value=""
                            className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg w-full cursor-pointer outline-none text-[#0D1B2E]"
                            style={{ padding: "8px 12px" }}
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
                            style={{ padding: "8px 12px", marginBottom: "16px" }}
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
                            style={{ padding: "8px 12px" }}
                          />

                        </div>

                        <div>

                          <label htmlFor=""
                            className="text-[12px] text-[#6B7280]">
                              Date Of Birth
                          </label>

                          <input type="text" value=""
                            className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg w-full cursor-pointer outline-none text-[#0D1B2E]"
                            style={{ padding: "8px 12px" }}
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
                            style={{ padding: "8px 12px" }}
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
            )
          }

          {/* SETTINGS SETTING */}
          {
            openMenu === "settings" && (
              <section
              style={{
                marginTop: "30px"
              }}>

                <div
                  className="flex flex-col gap-6">

                  {/* LANGUAGE */}
                  <div
                    className="flex justify-between border border-[#E5E7EB] rounded-lg shadow-md max-w-240"
                    style={{
                      padding: "20px 12px 12px 12px"
                    }}>

                    <div>

                      <h3
                        className="text-[#1A3A5C] text-[15px]/[24px] font-bold">
                          Language
                      </h3>

                      <p
                        className="text-[#6B7280] text-[12px]/[24px]">
                          Choose your preferred language for the applications interface
                      </p>

                      <div
                        className="border border-[#E5E7EB] rounded-lg shadow-md text-[12px]/[24px] text-[#1A3A5C] font-semibold w-50 cursor-pointer"
                        style={{
                          padding: "10px"
                        }}>
                        <select name="" id=""
                          className="w-full outline-none cursor-pointer"
                          >
                          <option 
                            value="english(us)"
                            className="">
                              English (US)
                          </option>

                        </select>

                      </div>

                    </div>

                    <BiWorld
                      className="text-[24px] text-[#1A3A5C]"
                    />

                  </div>

                  {/* THEME */}
                  <div
                    className="flex justify-between border border-[#E5E7EB] rounded-lg shadow-md max-w-240"
                    style={{
                      padding: "20px 12px 12px 12px"
                    }}>
                  
                    <div>

                      <h3
                        className="text-[#1A3A5C] text-[15px]/[24px] font-bold">
                          Theme
                      </h3>

                      <p
                        className="text-[#6B7280] text-[12px]/[24px]">
                          Select your preferred theme for the application
                      </p>

                      <div
                        className="border border-[#E5E7EB] rounded-lg shadow-md text-[12px]/[24px] text-[#1A3A5C] font-semibold w-50 cursor-pointer"
                        style={{
                          padding: "10px"
                        }}>
                        <select name="" id=""
                          className="w-full outline-none cursor-pointer"
                          >
                            
                          <option 
                            value="default"
                            className="">
                              Default
                          </option>

                          <option 
                            value="light"
                            className="">
                              Light
                          </option>

                          <option 
                            value="dark"
                            className="">
                              Dark
                          </option>

                        </select>
                        
                      </div>

                    </div>

                    <IoColorPalette
                      className="text-[24px] text-[#1A3A5C]"
                    />

                  </div>

                  {/* CLOSE ACCOUNT */}
                  <div
                    className="flex max-md:flex-col items-center max-md:items-baseline justify-between border border-[#E5E7EB] border-l-4 border-l-red-600 rounded-lg shadow-md max-w-240"
                    style={{
                      padding: "20px 12px 12px 12px"
                    }}>

                    <div
                      className="flex-1">

                      <h3
                        className="text-[#1A3A5C] text-[15px]/[24px] font-bold">
                          Close Account
                      </h3>

                      <p
                        className="text-[#6B7280] text-[12px]/[24px]">Permanently delete your account and all associated data. This action cannot be undone.</p>

                      <p
                        className="text-[12px]/[24px] text-red-600 font-semibold"
                        style={{
                          padding: "10px 0px"
                        }}>
                          Warning: This action is irreversible.
                      </p>

                    </div>

                    <div
                      className="text-white bg-red-600 flex items-center gap-1 rounded-lg cursor-pointer"
                      style={{
                        padding: "6px 14px",
                      }}>

                      <IoWarning
                        className="text-[18px]"
                      />

                      <button
                        className="text-[12px]/[24px] cursor-pointer">
                          Close Account
                      </button>

                    </div>

                  </div>

                </div>
              </section>
            )
          }

          {/* NOTIFICATIONS SETTING */}
          {
            openMenu === "notifications" && (
              
              <section
                style={{
                  marginTop: "30px"
                }}>

                <div
                  className="flex flex-col gap-6">

                  {/* GENERAL NOTIFICATIONS */}
                  <div
                    className="flex justify-between border border-[#E5E7EB] rounded-lg shadow-md max-w-240"
                    style={{
                      padding: "20px 12px 12px 12px"
                    }}>

                    <div>

                      <h3
                        className="text-[#1A3A5C] text-[15px]/[24px] font-bold">
                          General Notifications
                      </h3>

                      <p
                        className="text-[#6B7280] text-[12px]/[24px]">
                          Receive updates about account activity, security alerts, and important announcements
                      </p>

                    </div>

                    <div
                      className="w-12 h-6 bg-[#27A06E] flex items-center justify-end rounded-full cursor-pointer"
                      style={{
                        padding: "2px"
                      }}
                      >
                      
                      <div
                        className="w-5 h-5 bg-white rounded-full"
                        >
                      </div>

                    </div>

                  </div>

                  {/* TRANSACTION ALERTS */}
                  <div
                    className="flex justify-between border border-[#E5E7EB] rounded-lg shadow-md max-w-240"
                    style={{
                      padding: "20px 12px 12px 12px"
                    }}>

                    <div>

                      <h3
                        className="text-[#1A3A5C] text-[15px]/[24px] font-bold">
                          Transaction Alerts
                      </h3>

                      <p
                        className="text-[#6B7280] text-[12px]/[24px]">
                          Get notified instantly when money enters or leaves your account
                      </p>

                    </div>

                    <div
                      className="w-12 h-6 bg-[#27A06E] flex items-center justify-end rounded-full cursor-pointer"
                      style={{
                        padding: "2px"
                      }}
                      >
                      
                      <div
                        className="w-5 h-5 bg-white rounded-full"
                        >
                      </div>

                    </div>

                  </div>

                  {/* NOTIFICATIONS METHOD */}
                  <div
                    className="justify-between border border-[#E5E7EB] rounded-lg shadow-md max-w-240"
                    style={{
                      padding: "20px 12px 20px 12px"
                    }}>

                    <div>

                      <h3
                        className="text-[#1A3A5C] text-[15px]/[24px] font-bold">
                          Notifications Method
                      </h3>

                      <p
                        className="text-[#6B7280] text-[12px]/[24px]">
                          Receive notifications about special promotions, and exclusive deals
                      </p>

                    </div>

                    <div
                      className="flex flex-col gap-4"
                      style={{
                        marginTop: "24px"
                      }}>

                      <div
                        className="flex items-center gap-3">
                        
                        <input 
                          type="checkbox" 
                          name="" 
                          className="w-4 h-4 outline-none cursor-pointer accent-[#27A06E]"
                        />

                        <div
                          className="flex flex-col">

                          <h4
                            className="text-[#1A3A5C] text-[13px]/[24px] font-bold">
                              Email
                          </h4>

                          <p
                            className="text-[#6B7280] text-[12px]"
                            >
                              Receive notifications on your device
                          </p>

                        </div>

                      </div>

                      <div
                        className="flex items-center gap-3">

                        <input 
                          type="checkbox" 
                          name="" 
                          className="w-4 h-4 outline-none cursor-pointer accent-[#27A06E]"
                        />

                        <div
                          className="flex flex-col">

                          <h4
                            className="text-[#1A3A5C] text-[13px]/[24px] font-bold">
                              Push Notifications
                          </h4>

                          <p
                            className="text-[#6B7280] text-[12px]">
                              Get instant push notifications on your device
                          </p>

                        </div>

                      </div>

                      <div
                        className="flex items-center gap-3">

                        <input 
                          type="checkbox" 
                          name="" 
                          className="w-4 h-4 outline-none cursor-pointer accent-[#27A06E]"
                        />

                        <div
                          className="flex flex-col">

                          <h4
                            className="text-[#1A3A5C] text-[13px]/[24px] font-bold">
                              SMS
                          </h4>

                          <p
                            className="text-[#6B7280] text-[12px]">
                              Receive text messages for critical alerts
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </section>
            )
          }

          {/* PRIVACY SETTINGS */}
          {
            openMenu === "privacy" && (

              <section
                className="w-full"
                style={{
                  marginTop: "30px"
                }}>

                  <div
                    className="flex flex-col gap-8 w-full">

                      <div
                        className=" w-full flex justify-between gap-8">

                        {/* CHANGE PASSWORD */}
                        <div
                          className="flex-1 min-w-0 flex flex-col justify-between border border-[#E5E7EB] rounded-lg shadow-md"
                          style={{
                            padding: "20px 12px 12px 12px"
                          }}>

                          <div>

                            <h3
                              className="text-[#1A3A5C] font-bold">
                                Change Password
                            </h3>

                            <p
                              className="text-[#6B7280] text-[12px]/[24px]">
                                Update your password to keep your account secure
                            </p>

                          </div>

                          <form 
                            action=""
                            className="flex flex-col gap-4 w-full">

                            <div>

                              <label 
                                htmlFor=""
                                className="text-[#1A3A5C] text-[12px]/[24px] font-bold">
                                Current Password
                              </label>

                              <input 
                                type="password" 
                                name="" 
                                id="" 
                                className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg w-full shadow-md cursor-pointer outline-none text-[#0D1B2E]"
                                style={{ padding: "8px 12px" }}
                                />

                            </div>

                            <div>

                              <label 
                                htmlFor=""
                                className="text-[#1A3A5C] text-[12px]/[24px] font-bold">
                                New Password
                              </label>

                              <input 
                                type="password" 
                                name="" 
                                id="" 
                                className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg w-full shadow-md cursor-pointer outline-none text-[#0D1B2E]"
                                style={{ padding: "8px 12px" }}
                                />

                            </div>

                            <div>

                              <label 
                                htmlFor=""
                                className="text-[#1A3A5C] text-[12px]/[24px] font-bold">
                                Confirm New Password
                              </label>

                              <input 
                                type="password" 
                                name="" 
                                id="" 
                                className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg w-full shadow-md cursor-pointer outline-none text-[#0D1B2E]"
                                style={{ padding: "8px 12px" }}
                                />

                            </div>

                            <button
                              className="rounded-lg text-[12px]/[24px] font-bold text-[#FFFFFF] bg-[#a78620] cursor-pointer"
                              style={{
                                padding: "6px 14px",
                              }}>
                                Change Password
                            </button>

                          </form>

                        </div>

                        {/* RESET PASSWORD */}
                        <div
                          className="flex-1 min-w-0 flex flex-col justify-between border border-[#E5E7EB] rounded-lg shadow-md"
                          style={{
                            padding: "20px 12px 12px 12px"
                          }}>

                          <div>

                            <h3
                              className="text-[#1A3A5C] font-bold">
                                Reset Password
                            </h3>

                            <p
                              className="text-[#6B7280] text-[12px]/[24px]">
                                Reset your password to keep your account secure
                            </p>

                          </div>

                          <form 
                            action=""
                            className="flex flex-col gap-4">

                            <div>

                              <label 
                                htmlFor=""
                                className="text-[#1A3A5C] text-[12px]/[24px] font-bold">
                                Enter Email Address
                              </label>

                              <input 
                                type="email" 
                                name="" 
                                id="" 
                                className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg w-full shadow-md cursor-pointer outline-none text-[#0D1B2E]"
                                style={{ padding: "8px 12px" }}
                                />

                            </div>

                            <div>

                              <label 
                                htmlFor=""
                                className="text-[#1A3A5C] text-[12px]/[24px] font-bold">
                                New Password
                              </label>

                              <input 
                                type="password" 
                                name="" 
                                id="" 
                                className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg w-full shadow-md cursor-pointer outline-none text-[#0D1B2E]"
                                style={{ padding: "8px 12px" }}
                                />

                            </div>

                            <div>

                              <label 
                                htmlFor=""
                                className="text-[#1A3A5C] text-[12px]/[24px] font-bold">
                                Confirm New Password
                              </label>

                              <input 
                                type="password" 
                                name="" 
                                id="" 
                                className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg w-full shadow-md cursor-pointer outline-none text-[#0D1B2E]"
                                style={{ padding: "8px 12px" }}
                                />

                            </div>

                            <button
                              className="rounded-lg text-[12px]/[24px] font-bold text-[#FFFFFF] bg-[#a78620] cursor-pointer"
                              style={{
                                padding: "6px 14px",
                              }}>
                                Reset Password
                            </button>

                          </form>

                        </div>

                      </div>

                      <div
                        className=" w-full flex justify-between gap-8">

                        {/* CHANGE PIN */}
                        <div
                          className="flex-1 min-w-0 flex flex-col justify-between border border-[#E5E7EB] rounded-lg shadow-md"
                          style={{
                            padding: "20px 12px 12px 12px"
                          }}>

                          <div>

                            <h3
                              className="text-[#1A3A5C] font-bold">
                                Change PIN
                            </h3>

                            <p
                              className="text-[#6B7280] text-[12px]/[24px]">
                                Update your PIN to keep your account secure
                            </p>

                          </div>

                          <form 
                            action=""
                            className="flex flex-col gap-4">

                            <div>

                              <label 
                                htmlFor=""
                                className="text-[#1A3A5C] text-[12px]/[24px] font-bold">
                                Current PIN
                              </label>

                              <input 
                                type="text" 
                                name="" 
                                id="" 
                                className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg w-full shadow-md cursor-pointer outline-none text-[#0D1B2E]"
                                style={{ padding: "8px 12px" }}
                                />

                            </div>

                            <div>

                              <label 
                                htmlFor=""
                                className="text-[#1A3A5C] text-[12px]/[24px] font-bold">
                                New PIN
                              </label>

                              <input 
                                type="text" 
                                name="" 
                                id="" 
                                className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg w-full shadow-md cursor-pointer outline-none text-[#0D1B2E]"
                                style={{ padding: "8px 12px" }}
                                />

                            </div>

                            <div>

                              <label 
                                htmlFor=""
                                className="text-[#1A3A5C] text-[12px]/[24px] font-bold">
                                Confirm New PIN
                              </label>

                              <input 
                                type="text" 
                                name="" 
                                id="" 
                                className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg w-full shadow-md cursor-pointer outline-none text-[#0D1B2E]"
                                style={{ padding: "8px 12px" }}
                                />

                            </div>

                            <button
                              className="rounded-lg text-[12px]/[24px] font-bold text-[#FFFFFF] bg-[#a78620] cursor-pointer"
                              style={{
                                padding: "6px 14px",
                              }}>
                                Change PIN
                            </button>

                          </form>

                        </div>

                        {/* RESET PIN */}
                        <div
                          className="flex-1 min-w-0 flex flex-col justify-between border border-[#E5E7EB] rounded-lg shadow-md"
                          style={{
                            padding: "20px 12px 12px 12px"
                          }}>

                          <div>

                            <h3
                              className="text-[#1A3A5C] font-bold">
                                Forgot PIN
                            </h3>

                            <p
                              className="text-[#6B7280] text-[12px]/[24px]">
                                Reset your PIN to keep your account secure
                            </p>

                          </div>

                          <form 
                            action=""
                            className="flex flex-col gap-4">

                            <div>

                              <label 
                                htmlFor=""
                                className="text-[#1A3A5C] text-[12px]/[24px] font-bold">
                                Enter Email Address
                              </label>

                              <input 
                                type="email" 
                                name="" 
                                id="" 
                                className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg w-full shadow-md cursor-pointer outline-none text-[#0D1B2E]"
                                style={{ padding: "8px 12px" }}
                                />

                            </div>

                            <div>

                              <label 
                                htmlFor=""
                                className="text-[#1A3A5C] text-[12px]/[24px] font-bold">
                                New PIN
                              </label>

                              <input 
                                type="text" 
                                name="" 
                                id="" 
                                className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg w-full shadow-md cursor-pointer outline-none text-[#0D1B2E]"
                                style={{ padding: "8px 12px" }}
                                />

                            </div>

                            <div>

                              <label 
                                htmlFor=""
                                className="text-[#1A3A5C] text-[12px]/[24px] font-bold">
                                Confirm New PIN
                              </label>

                              <input 
                                type="text" 
                                name="" 
                                id="" 
                                className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg w-full shadow-md cursor-pointer outline-none text-[#0D1B2E]"
                                style={{ padding: "8px 12px" }}
                                />

                            </div>

                            <button
                              className="rounded-lg text-[12px]/[24px] font-bold text-[#FFFFFF] bg-[#a78620] cursor-pointer"
                              style={{
                                padding: "6px 14px",
                              }}>
                                Reset PIN
                            </button>

                          </form>

                        </div>

                      </div>

                  </div>

              </section>
            )
          }

        </div>

      </DashboardLayout>
    </div>
  );
}

export default Settings;
