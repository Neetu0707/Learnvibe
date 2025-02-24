import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, googleProvider } from "../auth/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

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

      toast.success(`Welcome, ${result.user.email}! Signup successful.`);

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.user.email,
          email: result.user.email,
          provider: "email",
        }),
      });

      if (response.ok) {
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error("Failed to save user to database.");
      }
    } catch (error) {
      console.log(error);
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use. Please sign in instead.");
        // navigate("/signin"); // Redirect to the signin page
      }
      const storedUser = localStorage.getItem("firebaseUser");

      if (storedUser) {
        toast.info("Already logged in. Redirecting to home...");
        // navigate("/"); // Redirect to the homepage
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  const handleGoogleSignup = async () => {
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
        <title>Sign Up - LearnVibe</title>
      </Helmet>
      <section className="relative z-10 pt-30 lg:pt-35 xl:pt-40 pb-18">
        {/* Background shapes */}
        <div className="absolute top-25 left-0 w-full flex flex-col gap-3 -z-1 opacity-50">
          <div className="w-full h-[1.24px] footer-bg-gradient"></div>
          {/* Add other background shapes here */}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-dark/0 to-dark -z-1"></div>

        <div className="text-center px-4">
          <h1 className="font-extrabold text-heading-2 text-white mb-5.5">
            Sign Up
          </h1>
        </div>
      </section>

      <section className="pt-17.5 pb-17.5 lg:pb-22.5 xl:pb-27.5">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div
            className="wow fadeInUp rounded-3xl bg-white/[0.05]"
            style={{ visibility: "visible" }}
          >
            <div className="flex">
              <div className="hidden lg:block w-full lg:w-1/2">
                <div className="relative py-20 pl-17.5 pr-22">
                  <h2 className="max-w-[292px] font-bold text-white text-heading-4 mb-10"></h2>
                  {/* <img src="images/sigin.svg" alt="signin" /> */}
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <div className="py-8 sm:py-20 pl-8 sm:pl-21 pr-8 sm:pr-20">
                  <form onSubmit={handleEmailSignup}>
                    <button
                      type="button"
                      onClick={handleGoogleSignup}
                      className="w-full flex items-center justify-center gap-3 p-3.5 font-medium text-white rounded-lg border border-white/[0.12] ease-in duration-300 hover:border-purple"
                    >
                      Sign up with Google
                    </button>

                    <span className="relative block font-medium text-sm text-center my-7.5">
                      <span className="block absolute left-0 top-1/2 h-[1px] w-22.5 bg-white/[0.12]"></span>
                      <span className="block absolute right-0 top-1/2 h-[1px] w-22.5 bg-white/[0.12]"></span>
                      Or sign up with email
                    </span>

                    <div className="mb-4 relative">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-white/[0.12] bg-transparent rounded-lg focus:border-purple pl-14.5 pr-4 py-3.5 font-medium outline-none focus-visible:shadow-none"
                      />
                    </div>

                    <div className="mb-5 relative">
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-white/[0.12] bg-transparent rounded-lg focus:border-purple pl-14.5 pr-4 py-3.5 font-medium outline-none focus-visible:shadow-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="hero-button-gradient flex justify-center w-full rounded-lg py-3 px-7 text-white font-medium ease-in duration-300 hover:opacity-80"
                    >
                      Sign Up
                    </button>

                    <p className="text-center font-medium text-white mt-5">
                      Already have an account?&nbsp;
                      <a href="/signin" className="text-purple">
                        Sign in Here
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
}
