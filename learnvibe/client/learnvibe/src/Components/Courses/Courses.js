import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Verifyemail from "../Notification/Verifyemail";

const Courses = () => {
  const [token, setToken] = useState(null);
  const [courses, setCourses] = useState([]);
  const [usercourses, setUserCourses] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [isverified, setIsVerified] = useState(false);
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("firebaseUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setToken(parsedUser);
      setEmail(parsedUser.email);
    }
  }, []);

  useEffect(() => {
    if (email) {
      getUserDetails(email);
      getStatus(email);
    }
    getCourses();
  }, [email]);

  const getCourses = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/upload/getfile`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();
      setCourses(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const getStatus = async (userEmail) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/upload/getcourse`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userEmail }),
        }
      );

      const statusData = await res.json();
      setUserCourses(statusData);
      console.log("User course status:", statusData);
    } catch (error) {
      console.error("Error fetching course status:", error);
    }
  };

  const registerCourse = async (courseName) => {
    try {
      if (!isverified) {
        toast.error(
          "Please Login to See Course Details!!"
        );
        setShowVerifyEmail(true);
        return;
      }
      else if (!isverified) {
        toast.error(
          "Please verify your email before registering for a course."
        );
        setShowVerifyEmail(true);
      } else {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/upload/addcourse`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              coursename: courseName,
              status: "in-progress",
              completed: 1,
            }),
          }
        );

        if (res.ok) {
          console.log("Course registered successfully!");
          if (token) {
            navigate(`/course/${courseName.replace(/\s+/g, "-")}`);
          } else {
            navigate("/signin");
          }
        } else {
          console.error("Failed to register course:", await res.text());
        }
      }
    } catch (error) {
      console.error("Error registering course:", error);
    }
  };

  const getUserDetails = async (email) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL
        }/auth/getuser?email=${encodeURIComponent(email)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setIsVerified(data?.user?.isverified);
      console.log("User details:", data?.user?.isverified);
      return data; // Return user data
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };

  return (
    <>
      <Header />
      <main>
        <section
          id="home"
          class="relative overflow-hidden z-10 pt-35 md:pt-40 xl:pt-45"
        >
          <div class="max-w-7xl mx-auto">
            <div class="absolute -z-10 pointer-events-none inset-0 overflow-hidden -mx-28">
              <div class="absolute -z-1 -top-[128%] sm:-top-[107%] xl:-top-[73%] left-1/2 -translate-x-1/2 -u-z-10 hero-circle-gradient w-full h-[1282px] rounded-full max-w-[1282px]"></div>
              <div class="absolute -z-1 -top-[112%] sm:-top-[93%] xl:-top-[62%] left-1/2 -translate-x-1/2 -u-z-10 hero-circle-gradient w-full h-[1046px] rounded-full max-w-[1046px]"></div>
              <div class="absolute top-0 left-1/2 -translate-x-1/2 -u-z-10">
                <img src="images/blur-02.svg" alt="blur" class="max-w-none" />
              </div>
              <div class="absolute top-0 left-1/2 -translate-x-1/2 -u-z-10">
                <img src="images/blur-01.svg" alt="blur" class="max-w-none" />
              </div>
            </div>
          </div>

          <div class="mx-auto max-w-[900px] px-4 sm:px-8 xl:px-0 relative z-1">
            <div class="text-center">
              <a
                href="/#"
                class="hero-subtitle-gradient hover:hero-subtitle-hover relative mb-5 font-medium text-sm inline-flex items-center gap-2 py-2 px-4.5 rounded-full"
              >
                <img src="images/icon-title.svg" alt="icon" />

                <span class="hero-subtitle-text">See Our Courses</span>
              </a>
              <h1 class="text-white mb-6 text-3xl font-extrabold sm:text-5xl xl:text-heading-1">
                Unlock Your Potential with Learnvibe
              </h1>
              <p class="max-w-[500px] mx-auto mb-9 font-medium md:text-lg">
                Dive into personalized, interactive courses designed to enhance
                your skills and accelerate your learning journey.
              </p>

              <Link class="hero-button-gradient inline-flex rounded-lg py-3 px-7 text-white font-medium ease-in duration-300 hover:opacity-80">
                Start Here
              </Link>
            </div>
          </div>

          <div class="mt-17" data-wow-delay="0.1s" className="p-10">
            <div className="ea za xc justify-center">
              {loading ? (
                <>
                  {[...Array(2)].map((_, index) => (
                    <div key={index} className="pb nf hk/2 _k/3 2xl:ud-w-1/4">
                      <div className="ja nd qd wd fe hf animate-pulse">
                        <div className="f ka gd kd bg-gray-300 h-[200px] w-full rounded-md"></div>
                        <div className="mt-4">
                          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                          <div className="h-10 bg-gray-300 rounded w-full"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                courses.map((course) => (
                  <div key={course.id} className="pb nf hk/2 _k/3 2xl:ud-w-1/4">
                    <div className="ja nd qd wd fe hf">
                      <div className="f ka gd kd">
                        <img
                          src={course.file_data.image}
                          alt="course"
                          className="bg-cover min-h-[200px]"
                        />
                      </div>
                      <div>
                        <h3>
                          <a href="#" className="sa ya hh nh vh cj">
                            {course.file_data.courseName}
                          </a>
                        </h3>
                        <div className="ka za yc ad">
                          <div className="pb"></div>
                        </div>
                        <button
                          onClick={() => registerCourse(course.file_data.courseName)}
                          className="za yc _c ld ee se kf eh nh vh w-full"
                        >
                          {usercourses.find((c) => c.course_id === course.file_data.courseName)?.completed === 1
                            ? `${usercourses.find((c) => c.course_id === course.file_data.courseName)?.completed}%`
                            : "Start Here"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
        <ToastContainer />
        {showVerifyEmail && <Verifyemail setShowVerifyEmail={setShowVerifyEmail} />}
      </main>
      <Footer />
    </>
  );
};

export default Courses;
