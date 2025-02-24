import React, { useState, useEffect } from "react";
import Header from "./Header";
import Features from "./Features";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";
import Contact from "./Contact";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Home = () => {
  const [scrollTop, setScrollTop] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.pageYOffset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
    <Header/>
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

                <span class="hero-subtitle-text">
                Learn, Engage, Thrive Everywhere
                </span>
              </a>
              <h1 class="text-white mb-6 text-3xl font-extrabold sm:text-5xl xl:text-heading-1">
              Learn Anytime, Anywhere – Empower Your Education with LearnVibe!
              </h1>
              <p class="max-w-[500px] mx-auto mb-9 font-medium md:text-lg">
              An interactive e-learning platform for personalized, engaging, and accessible education.
              </p>

              <Link
              to={'/courses'}
                class="hero-button-gradient inline-flex rounded-lg py-3 px-7 text-white font-medium ease-in duration-300 hover:opacity-80"
              >
                Start Here
              </Link>
            </div>
          </div>

          <div class="mt-17 flex justify-center" data-wow-delay="0.1s">
            <img class="mx-auto" src="images/web.png" alt="hero" className="max-w-[800px] w-[90%] lg:w-full" />
          </div>
        </section>
        <Features />
        <Section3 />
        {/* <Section4 /> */}
        {/* <Section5 /> */}
        <Contact />
        <button
          className={`hidden items-center justify-center w-10 h-10 rounded-[4px] shadow-solid-5 bg-purple hover:opacity-70 fixed bottom-8 right-8 z-[999] ${
            scrollTop ? "flex" : ""
          }`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <svg
            className="fill-white w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"></path>
          </svg>
        </button>
      </main>
      <Footer/>
    </>
  );
};

export default Home;
