import React, { useState, useEffect } from "react";
import { Link ,useLocation} from "react-router-dom";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const location = useLocation(); // Get current route
  const [active, setActive] = useState("home");
  const [stickyMenu, setStickyMenu] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

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
      if(data.user.role === "admin"){
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
              <img src="/images/logo (2).png" alt="Logo" className="h-[40px] -mt-1"/>
              <img src="/images/logo.png" alt="" className="h-[35px]" />
            </Link>

            {/* Hamburger Toggle BTN */}
            <button
              className="lg:hidden block"
              onClick={() => setShowSidebar(true)}
            >
              <div className="flex flex-col gap-2">
                <p className="w-[30px] h-[2px] bg-white rounded-full"></p>
                <p className="w-[30px] h-[2px] bg-white rounded-full"></p>
                <p className="w-[30px] h-[2px] bg-white rounded-full"></p>
              </div>
            </button>
            {/* Hamburger Toggle BTN */}
          </div>

          <div
            className={`w-full lg:w-3/4 h-0 lg:h-auto invisible lg:visible lg:flex items-center justify-between ${
              navigationOpen ? "max-h-[400px] overflow-y-scroll" : ""
            }`}
          >
            <nav>
              <ul className="flex lg:items-center flex-col lg:flex-row gap-5 lg:gap-2">
                <li
                  className="nav__menu lg:py-7"
                  style={{ padding: stickyMenu ? "0.25rem 0" : "" }}
                >
                  <Link
                    to={"/"}
                    className={`relative text-white/80 text-sm py-1.5 px-4 border border-transparent hover:text-white hover:nav-gradient ${active ==="home" ? "!text-white nav-gradient" : ""}`}
                  >
                    Home
                  </Link>
                </li>
                <li
                  className="nav__menu lg:py-7"
                  style={{ padding: stickyMenu ? "0.25rem 0" : "" }}
                >
                  <Link
                    to={"/courses"}
                    className="relative text-white/80 text-sm py-1.5 px-4 border border-transparent hover:text-white hover:nav-gradient"
                  >
                    Courses
                  </Link>
                </li>
                <li
                  className="nav__menu lg:py-7"
                  style={{ padding: stickyMenu ? "0.25rem 0" : "" }}
                >
                  <Link
                    to={"/playground"}
                    className="relative text-white/80 text-sm py-1.5 px-4 border border-transparent hover:text-white hover:nav-gradient"
                  >
                    Playground
                  </Link>
                </li>
                <li
                  className="nav__menu lg:py-7"
                  style={{ padding: stickyMenu ? "0.25rem 0" : "" }}
                >
                  <Link
                    to={"/about"}
                    className="relative text-white/80 text-sm py-1.5 px-4 border border-transparent hover:text-white hover:nav-gradient"
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
                    to={"/adddata"}
                    className="relative text-white/80 text-sm py-1.5 px-4 border border-transparent hover:text-white hover:nav-gradient"
                  >
                    Add Data
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
                  <div
                    className="absolute mt-2 -bottom-50 right-0 h-[100px] min-w-[200px] bg-white rounded-lg shadow-lg p-4 invisible lg:visible"
                  >
                    <p className="text-[20px] text-black">
                      Hello !!
                    </p>
                    <p className="text-[20px] text-black">
                      {email}
                    </p>
                    <button
                      onClick={() => {
                        setShowLogout(true);
                      }}
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

        <div
          className={`w-full h-screen bg-[#0c0d3a] p-8 absolute top-0  lg:hidden *
        ${showSidebar ? "right-[0%] transition-transform" : "right-[100%]"}
        `}
        >
          <div className="w-full min-h-[1vh] flex justify-end">
            <button
              className="tetx-white text-[30px]"
              onClick={() => setShowSidebar(false)}
            >
              &times;
            </button>
          </div>
          <nav>
            <ul className="flex lg:items-center flex-col lg:flex-row gap-5 lg:gap-2">
              <li
                className="nav__menu lg:py-7"
                style={{ padding: stickyMenu ? "0.25rem 0" : "" }}
              >
                <Link
                  to={"/"}
                  className="relative text-white/80 text-sm py-1.5 px-4 border border-transparent hover:text-white hover:nav-gradient !text-white nav-gradient"
                >
                  Home
                </Link>
              </li>
              <li
                className="nav__menu lg:py-7"
                style={{ padding: stickyMenu ? "0.25rem 0" : "" }}
              >
                <Link
                  to={"/courses"}
                  className="relative text-white/80 text-sm py-1.5 px-4 border border-transparent hover:text-white hover:nav-gradient"
                >
                  Courses
                </Link>
              </li>
              <li
                className="nav__menu lg:py-7"
                style={{ padding: stickyMenu ? "0.25rem 0" : "" }}
              >
                <Link
                  to={"/playground"}
                  className="relative text-white/80 text-sm py-1.5 px-4 border border-transparent hover:text-white hover:nav-gradient"
                >
                  Playground
                </Link>
              </li>
              <li
                className="nav__menu lg:py-7"
                style={{ padding: stickyMenu ? "0.25rem 0" : "" }}
              >
                <Link
                  to={"/about"}
                  className="relative text-white/80 text-sm py-1.5 px-4 border border-transparent hover:text-white hover:nav-gradient"
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
                   to={"/adddata"}
                   className="relative text-white/80 text-sm py-1.5 px-4 border border-transparent hover:text-white hover:nav-gradient"
                 >
                   Add Data
                 </Link>
               </li>
                )}
            </ul>
          </nav>

          {token ? (
            <>
              <div className="flex flex-col justify-center gap-6 mt-7 lg:mt-0 pl-4">
                <p
                  className="button-border-gradient relative rounded-lg text-white text-sm flex items-center gap-1.5 py-2 px-4.5 shadow-button hover:button-gradient-hover hover:shadow-none w-fit"
                  onClick={() => {
                    setShowLogout(true);
                  }}
                >
                  Logout
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
                </p>
              </div>
            </>
          ) : (
            <div className="flex flex-col justify-center gap-6 mt-7 lg:mt-0 pl-4">
              <Link
                to={"/signin"}
                className="text-white text-sm hover:text-opacity-75 w-fit"
              >
                Sign in
              </Link>

              <Link
                to={"/signup"}
                className="button-border-gradient relative rounded-lg text-white text-sm flex items-center gap-1.5 py-2 px-4.5 shadow-button hover:button-gradient-hover hover:shadow-none w-fit"
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
      </header>

      {showLogout && (
        <div className="absolute z-50 w-full h-screen flex justify-center items-center bg-[#14185565] ">
          <div className="w-[300px] h-[200px] bg-white rounded-lg flex flex-col justify-center items-center">
            <p>Are You Sure You want to Logout ??</p>

            <div className="flex gap-4">
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={() => {
                  setShowLogout(false);
                }}
              >
                No
              </button>
              <button
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={() => {
                  localStorage.removeItem("firebaseUser");
                  window.location.reload();
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
