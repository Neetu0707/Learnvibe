import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MobileSidebar from "./MobileSidebar";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const location = useLocation(); // Get current route
  const [active, setActive] = useState(location.pathname);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const routeName = location.pathname; // Extract route name
    // console.log(routeName);
    setActive(routeName);
  }, [location]);


  useEffect(() => {
    const storedUser = localStorage.getItem("firebaseUser");
    if (storedUser) {
      setToken(storedUser);
      const res = getUserDetails(JSON.parse(storedUser).email);
      //  console.log(res);

    }
    // console.log(token);
  });
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getUserDetails = async (email) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/getuser?email=${encodeURIComponent(email)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setEmail(email);
      const data = await response.json();
      if (data.user.role === "admin") {
        setIsAdmin(true);
      }
      return data; // Return user data
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };


  return (
    <>
      <header
        className="fixed left-0 top-0 w-full z-50 py-7 lg:py-0"
        style={{
          transition: "all 0.1s",
          ...(stickyMenu && {
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            paddingTop: "1rem",
            paddingBottom: "1rem",
          }),
        }}
      >
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0 lg:flex items-center justify-between relative">
          <div className="w-full lg:w-1/4 flex items-center justify-between">
            <Link to={"/"} className="flex">
              <img src="/images/logo (2).png" alt="Logo" className="h-[40px] -mt-1" />
              <img src="/images/logo.png" alt="" className="h-[35px]" />
            </Link>

            {/* Hamburger Toggle BTN */}
            <IconButton onClick={() => setSidebarOpen(true)} sx={{ color: "white" }}>
              <MenuIcon fontSize="large" />
            </IconButton>
            {/* Hamburger Toggle BTN */}
          </div>

          <div
            className={`w-full lg:w-3/4 h-0 lg:h-auto invisible lg:visible lg:flex items-center justify-between ${navigationOpen ? "max-h-[400px] overflow-y-scroll" : ""
              }`}
          >
            <nav>
              <ul className="flex lg:items-center flex-col lg:flex-row gap-5 lg:gap-2">
                <li
                  className="nav__menu lg:py-7"
                  style={{ padding: stickyMenu ? "0.25rem 0" : "" }}
                >
                  <Link
                    to="/"
                    onClick={() => setActive("/")}
                    className={`relative text-white/80 text-sm py-1.5 px-4 border border-transparent hover:text-white hover:nav-gradient ${active === "/" ? "!text-white nav-gradient" : ""
                      }`}
                  >
                    Home
                  </Link>
                </li>
                <li
                  className="nav__menu lg:py-7"
                  style={{ padding: stickyMenu ? "0.25rem 0" : "" }}
                >
                  <Link
                    to="/courses"
                    onClick={() => setActive("/courses")}
                    className={`relative text-white/80 text-sm py-1.5 px-4 border border-transparent hover:text-white hover:nav-gradient ${active === "/courses" ? "!text-white nav-gradient" : ""
                      }`}
                  >
                    Courses
                  </Link>
                </li>
                <li
                  className="nav__menu lg:py-7"
                  style={{ padding: stickyMenu ? "0.25rem 0" : "" }}
                >
                  <Link
                    to="/playground"
                    onClick={() => setActive("/playground")}
                    className={`relative text-white/80 text-sm py-1.5 px-4 border border-transparent hover:text-white hover:nav-gradient ${active === "/playground" ? "!text-white nav-gradient" : ""
                      }`}
                  >
                    Playground
                  </Link>
                </li>
                <li
                  className="nav__menu lg:py-7"
                  style={{ padding: stickyMenu ? "0.25rem 0" : "" }}
                >
                  <Link
                    to="/about"
                    onClick={() => setActive("/about")}
                    className={`relative text-white/80 text-sm py-1.5 px-4 border border-transparent hover:text-white hover:nav-gradient ${active === "/about" ? "!text-white nav-gradient" : ""
                      }`}
                  >
                    About
                  </Link>
                </li>
                {isAdmin && (
                  <li
                    className="nav__menu lg:py-7"
                    style={{ padding: stickyMenu ? "0.25rem 0" : "" }}
                  >
                    <Link
                      to="/adddata"
                      onClick={() => setActive("/adddata")}
                      className={`relative text-white/80 text-sm py-1.5 px-4 border border-transparent hover:text-white hover:nav-gradient ${active === "/adddata" ? "!text-white nav-gradient" : ""
                        }`}
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
              </ul>
            </nav>

            {token ? (
              <div className="relative">
                <div
                  className="w-[40px] h-[40px] rounded-full overflow-hidden relative cursor-pointer bg-white"
                  onClick={() => setShowProfile(!showProfile)}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/219/219970.png"
                    alt=""
                    className="bg-cover"
                  />
                </div>

                {showProfile && (
                  <div className="absolute mt-2 right-0 h-auto min-w-[220px] bg-white rounded-xl shadow-lg p-4 transition-all duration-300">
                    <p className="text-lg font-semibold text-gray-700">Hello !!</p>
                    <p className="text-md text-gray-600 truncate">{email}</p>

                    <button
                      className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 rounded-lg transition-all"
                      onClick={() => setShowLogout(true)}
                    >
                      Logout
                    </button>
                  </div>

                )}
              </div>
            ) : (
              <div className="flex items-center gap-6 mt-7 lg:mt-0">
                <Link
                  to={"/signin"}
                  className="text-white text-sm hover:text-opacity-75"
                >
                  Sign in
                </Link>

                <Link
                  to={"/signup"}
                  className="button-border-gradient relative rounded-lg text-white text-sm flex items-center gap-1.5 py-2 px-4.5 shadow-button hover:button-gradient-hover hover:shadow-none"
                >
                  Sign up
                  <svg
                    className="mt-0.5"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.4002 7.60002L9.2252 2.35002C9.0002 2.12502 8.6502 2.12502 8.4252 2.35002C8.2002 2.57502 8.2002 2.92502 8.4252 3.15002L12.6252 7.42502H2.0002C1.7002 7.42502 1.4502 7.67502 1.4502 7.97502C1.4502 8.27502 1.7002 8.55003 2.0002 8.55003H12.6752L8.4252 12.875C8.2002 13.1 8.2002 13.45 8.4252 13.675C8.5252 13.775 8.6752 13.825 8.8252 13.825C8.9752 13.825 9.1252 13.775 9.2252 13.675L14.4002 8.42502C14.6252 8.20002 14.6252 7.85002 14.4002 7.60002Z"
                      fill="white"
                    ></path>
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>

        <MobileSidebar open={sidebarOpen} toggleSidebar={() => setSidebarOpen(false)} isAdmin={isAdmin} token={token} setToken={setToken} />
      </header>

      {showLogout && (
        <div className="absolute inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-md">
          <div className="w-[350px] h-[220px] bg-white shadow-lg rounded-2xl flex flex-col justify-between items-center p-6">
            <h3 className="text-lg font-semibold text-gray-800">Are you sure you want to Logout?</h3>

            <div className="flex gap-6">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-5 py-2 rounded-lg transition-all"
                onClick={() => setShowLogout(false)}
              >
                No
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-medium px-5 py-2 rounded-lg transition-all"
                onClick={() => {
                  localStorage.removeItem("firebaseUser");
                  window.location.reload();
                }}
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>

      )}
    </>
  );
};

export default Header;
