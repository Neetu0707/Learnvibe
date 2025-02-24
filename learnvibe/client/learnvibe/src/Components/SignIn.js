import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../auth/firebase";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result);
      // Extract necessary parts of the result to store in localStorage
      const userData = {
        uid: result.user.uid,
        email: result.user.email,
        refreshToken: result.user.stsTokenManager.refreshToken,
        accessToken: result.user.stsTokenManager.accessToken,
        expirationTime: result.user.stsTokenManager.expirationTime,
      };

      // Store the data in localStorage
      localStorage.setItem("firebaseUser", JSON.stringify(userData));
      toast.success("Login Successful!");
      navigate("/");
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Extract necessary parts of the user object
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        refreshToken: user.stsTokenManager.refreshToken,
        accessToken: user.stsTokenManager.accessToken,
        expirationTime: user.stsTokenManager.expirationTime,
        provider: "google",
      };

      // Store the user data in localStorage
      localStorage.setItem("firebaseUser", JSON.stringify(userData));

      toast.success("Login successful!");

      // Send user data to the backend
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          provider: "google",
        }),
      });

      if (response.ok) {
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error("Failed to save user to database.");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign In - LearnVibe</title>
      </Helmet>
      <section class="relative z-10 pt-30 lg:pt-35 xl:pt-40 pb-18">
        {/* <!-- bg shapes --> */}
        <div class="absolute top-25 left-0 w-full flex flex-col gap-3 -z-1 opacity-50">
          <div class="w-full h-[1.24px] footer-bg-gradient"></div>
          <div class="w-full h-[2.47px] footer-bg-gradient"></div>
          <div class="w-full h-[3.71px] footer-bg-gradient"></div>
          <div class="w-full h-[4.99px] footer-bg-gradient"></div>
          <div class="w-full h-[6.19px] footer-bg-gradient"></div>
          <div class="w-full h-[7.42px] footer-bg-gradient"></div>
          <div class="w-full h-[8.66px] footer-bg-gradient"></div>
          <div class="w-full h-[9.90px] footer-bg-gradient"></div>
          <div class="w-full h-[13px] footer-bg-gradient"></div>
        </div>
        <div class="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-dark/0 to-dark -z-1"></div>

        <div class="text-center px-4">
          <h1 class="font-extrabold text-heading-2 text-white mb-5.5">
            Sign in
          </h1>
          <ul class="flex items-center justify-center gap-2">
            <li class="font-medium">
              <a href="index.html">Home</a>
            </li>
            <li class="font-medium">/ Sign in</li>
          </ul>
        </div>
      </section>
      <section class="pt-17.5 pb-17.5 lg:pb-22.5 xl:pb-27.5">
        <div class="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div
            class="wow fadeInUp rounded-3xl bg-white/[0.05]"
            style={{ visibility: "visible" }}
          >
            <div class="flex">
              <div class="hidden lg:block w-full lg:w-1/2">
                <div class="relative py-20 pl-17.5 pr-22">
                  <div class="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-white/0 via-white/20 to-white/0"></div>

                  <h2 class="max-w-[292px] font-bold text-white text-heading-4 mb-10">
                    {/* Unlock the Power of Writing Tool */}
                  </h2>
                  {/* <img src="images/sigin.svg" alt="signin" /> */}
                </div>
              </div>

              <div class="w-full lg:w-1/2">
                <div class="py-8 sm:py-20 pl-8 sm:pl-21 pr-8 sm:pr-20">
                  <form onSubmit={handleEmailLogin}>
                    <button
                      class="w-full flex items-center justify-center gap-3 p-3.5 font-medium text-white rounded-lg border border-white/[0.12] ease-in duration-300 hover:border-purple"
                      onClick={handleGoogleLogin}
                    >
                      <svg
                        width="23"
                        height="22"
                        viewBox="0 0 23 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_132_14584)">
                          <path
                            d="M22.5001 11.2438C22.5134 10.4876 22.4338 9.73256 22.2629 8.995H11.7246V13.0771H17.9105C17.7933 13.7929 17.5296 14.478 17.1352 15.0914C16.7409 15.7047 16.224 16.2335 15.6158 16.646L15.5942 16.7827L18.9264 19.3124L19.1571 19.335C21.2772 17.4161 22.4997 14.5926 22.4997 11.2438"
                            fill="#4285F4"
                          ></path>
                          <path
                            d="M11.7245 22C14.755 22 17.2992 21.0221 19.1577 19.3355L15.6156 16.6464C14.6679 17.2944 13.3958 17.7467 11.7245 17.7467C10.3051 17.7385 8.92433 17.2926 7.77814 16.472C6.63195 15.6515 5.77851 14.4981 5.33892 13.1755L5.20737 13.1865L1.74255 15.8142L1.69727 15.9376C2.63043 17.7602 4.06252 19.2925 5.83341 20.3631C7.60429 21.4337 9.64416 22.0005 11.7249 22"
                            fill="#34A853"
                          ></path>
                          <path
                            d="M5.33889 13.1755C5.09338 12.4753 4.96669 11.7404 4.96388 11C4.9684 10.2608 5.09041 9.52685 5.32552 8.8245L5.31927 8.67868L1.81196 6.00867L1.69724 6.06214C0.910039 7.5938 0.5 9.28491 0.5 10.9999C0.5 12.7148 0.910039 14.406 1.69724 15.9376L5.33889 13.1755Z"
                            fill="#FBBC05"
                          ></path>
                          <path
                            d="M11.7249 4.25337C13.3333 4.22889 14.8888 4.8159 16.065 5.89121L19.2329 2.86003C17.2011 0.992106 14.5106 -0.0328008 11.7249 3.27798e-05C9.64418 -0.000452376 7.60433 0.566279 5.83345 1.63686C4.06256 2.70743 2.63046 4.23965 1.69727 6.06218L5.32684 8.82455C5.77077 7.50213 6.62703 6.34962 7.77491 5.5295C8.9228 4.70938 10.3044 4.26302 11.7249 4.25337Z"
                            fill="#EB4335"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_132_14584">
                            <rect
                              width="22"
                              height="22"
                              fill="white"
                              transform="translate(0.5)"
                            ></rect>
                          </clipPath>
                        </defs>
                      </svg>
                      Sign in with Google
                    </button>

                    <span class="relative block font-medium text-sm text-center my-7.5">
                      <span class="block absolute left-0 top-1/2 h-[1px] w-22.5 bg-white/[0.12]"></span>
                      <span class="block absolute right-0 top-1/2 h-[1px] w-22.5 bg-white/[0.12]"></span>
                      Or sign in with email
                    </span>

                    <div class="mb-4 relative">
                      <span class="absolute top-1/2 -translate-y-1/2 left-6">
                        <svg
                          width="16"
                          height="12"
                          viewBox="0 0 16 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.9998 0.399994H1.9998C1.1498 0.399994 0.424805 1.09999 0.424805 1.97499V10.075C0.424805 10.925 1.1248 11.65 1.9998 11.65H13.9998C14.8498 11.65 15.5748 10.95 15.5748 10.075V1.94999C15.5748 1.09999 14.8498 0.399994 13.9998 0.399994ZM13.9998 1.52499C14.0248 1.52499 14.0498 1.52499 14.0748 1.52499L7.9998 5.42499L1.9248 1.52499C1.9498 1.52499 1.9748 1.52499 1.9998 1.52499H13.9998ZM13.9998 10.475H1.9998C1.7498 10.475 1.5498 10.275 1.5498 10.025V2.62499L7.3998 6.37499C7.5748 6.49999 7.7748 6.54999 7.9748 6.54999C8.1748 6.54999 8.3748 6.49999 8.5498 6.37499L14.3998 2.62499V10.05C14.4498 10.3 14.2498 10.475 13.9998 10.475Z"
                            fill="#918EA0"
                          ></path>
                        </svg>
                      </span>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        class="w-full border border-white/[0.12] bg-transparent rounded-lg focus:border-purple pl-14.5 pr-4 py-3.5 font-medium outline-none focus-visible:shadow-none"
                      />
                    </div>

                    <div class="mb-5 relative">
                      <span class="absolute top-1/2 -translate-y-1/2 left-6">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_368_6544)">
                            <path
                              d="M14.0752 1.92501C13.1252 0.975012 11.8502 0.450012 10.5002 0.450012C9.1502 0.450012 7.8502 0.975012 6.9002 1.92501C5.6252 3.20001 5.1252 5.00001 5.5752 6.75001L0.725195 11.575C0.550195 11.75 0.450195 12 0.450195 12.275V14.6C0.450195 15.125 0.875195 15.575 1.4252 15.575H3.7502C4.0002 15.575 4.2502 15.475 4.4502 15.3L5.0252 14.725C5.2252 14.525 5.3502 14.225 5.3002 13.925V13.875L5.6002 13.85C6.0752 13.8 6.4252 13.45 6.4752 12.975L6.5002 12.675H6.5502C6.8252 12.7 7.1002 12.625 7.3252 12.425C7.5252 12.25 7.6502 11.975 7.6502 11.7V11.5H7.8252C8.0752 11.5 8.3252 11.4 8.5002 11.225L9.3252 10.425C11.0502 10.85 12.8502 10.375 14.1002 9.12501C16.0502 7.12501 16.0502 3.90001 14.0752 1.92501ZM13.2752 8.30001C12.2502 9.32501 10.7252 9.70001 9.3002 9.22501C9.1002 9.15001 8.8752 9.20001 8.7252 9.35001L7.7252 10.35H7.0502C6.7502 10.35 6.4752 10.6 6.4752 10.925V11.525L6.0252 11.475C5.8752 11.45 5.7252 11.5 5.6002 11.6C5.4752 11.7 5.4002 11.825 5.4002 11.975L5.3252 12.725L4.5752 12.8C4.4252 12.825 4.2752 12.9 4.2002 13C4.1002 13.125 4.0502 13.275 4.0752 13.425L4.1502 13.975L3.6752 14.45H1.5752V12.35L6.6002 7.32501C6.7502 7.17501 6.8002 6.95001 6.7252 6.75001C6.2752 5.32501 6.6252 3.80001 7.6752 2.75001C8.4252 2.00001 9.4002 1.60001 10.4752 1.60001C11.5252 1.60001 12.5252 2.00001 13.2752 2.75001C14.8252 4.25001 14.8252 6.75001 13.2752 8.30001Z"
                              fill="#918EA0"
                            ></path>
                            <path
                              d="M11.3498 2.875C10.8748 2.875 10.4248 3.05 10.0748 3.4C9.3748 4.1 9.3748 5.225 10.0748 5.925C10.4248 6.275 10.8748 6.45 11.3498 6.45C11.8248 6.45 12.2748 6.275 12.6248 5.925C12.9748 5.575 13.1498 5.125 13.1498 4.65C13.1498 4.175 12.9748 3.725 12.6248 3.375C12.2748 3.05 11.8248 2.875 11.3498 2.875ZM11.8248 5.125C11.5748 5.375 11.1248 5.375 10.8748 5.125C10.6248 4.875 10.6248 4.45 10.8748 4.175C10.9998 4.05 11.1748 3.975 11.3498 3.975C11.5248 3.975 11.6998 4.05 11.8248 4.175C11.9498 4.3 12.0248 4.475 12.0248 4.65C12.0248 4.825 11.9498 5 11.8248 5.125Z"
                              fill="#918EA0"
                            ></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_368_6544">
                              <rect width="16" height="16" fill="white"></rect>
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        class="w-full border border-white/[0.12] bg-transparent rounded-lg focus:border-purple pl-14.5 pr-4 py-3.5 font-medium outline-none focus-visible:shadow-none"
                      />
                    </div>

                    <div class="flex items-center justify-between mb-7.5">
                      <div x-data="{ checkboxToggle: false }"></div>
                      <a href="/#" class="font-medium text-sm text-purple">
                        Forgot Password?
                      </a>
                    </div>

                    <button
                      type="submit"
                      class="hero-button-gradient flex justify-center w-full rounded-lg py-3 px-7 text-white font-medium ease-in duration-300 hover:opacity-80"
                    >
                      Sign in Learnvibe
                    </button>

                    <p class="text-center font-medium text-white mt-5">
                      Don't have an account?
                      <Link to={"/signup"} class="text-purple">
                        Sign Up for Free
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer/>
    </>
  );
};

export default SignIn;
