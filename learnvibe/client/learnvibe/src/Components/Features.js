import React from "react";

const Features = () => {
  return (
    <>
      <section
        id="features"
        class="overflow-hidden pt-17.5 lg:pt-22.5 xl:pt-27.5 scroll-mt-17"
      >
        <div class="max-w-[1222px] mx-auto px-4 sm:px-8 xl:px-0">
          {/* <!-- Section Title --> */}
          <div class="wow fadeInUp text-center" style={{ visibility: 'visible' }}>
            <span class="hero-subtitle-gradient relative mb-4 font-medium text-sm inline-flex items-center gap-2 py-2 px-4.5 rounded-full">
              <img src="images/icon-title.svg" alt="icon" />

              <span class="hero-subtitle-text"> Some of Main Features </span>
            </span>
            <h2 class="text-white mb-4.5 text-2xl font-extrabold sm:text-4xl xl:text-heading-2">
              Key Features of Our Tool
            </h2>
            <p class="max-w-[714px] mx-auto mb-5 font-medium">
              Our AI writing tool is designed to empower you with exceptional
              writing capabilities, making the writing process more efficient,
              accurate, and enjoyable.
            </p>
          </div>

          <div class="relative">
            <div class="features-row-border rotate-90 w-1/2 h-[1px] absolute top-1/2 left-1/2 -translate-y-1/2 lg:-translate-x-1/3 lg:left-1/4 hidden lg:block"></div>
            <div class="features-row-border rotate-90 w-1/2 h-[1px] absolute top-1/2 right-1/2 -translate-y-1/2 lg:right-[8.3%] hidden lg:block"></div>

            {/* <!--=== Features Row ===--> */}
            <div class="flex flex-wrap justify-center">
              {/* <!-- Features Item --> */}
              <div class="w-full sm:w-1/2 lg:w-1/3">
                <div class="group relative overflow-hidden text-center py-8 sm:py-10 xl:py-15 px-4 lg:px-8 xl:px-13">
                  <span class="group-hover:opacity-100 opacity-0 features-bg absolute w-full h-full left-0 top-0 -z-1"></span>
                  <span class="icon-border relative max-w-[80px] w-full h-20 rounded-full inline-flex items-center justify-center mb-8 mx-auto">
                    <img src="images/icon-01.svg" alt="icon" />
                  </span>
                  <h4 class="font-semibold text-lg text-white mb-4">
                  Personalized Learning Paths
                  </h4>
                  <p class="font-medium">
                  Tailored content recommendations based on your pace, preferences, and progress for a customized learning experience.
                  </p>
                </div>
              </div>

              {/* <!-- Features Item --> */}
              <div class="w-full sm:w-1/2 lg:w-1/3">
                <div class="group relative overflow-hidden text-center py-8 sm:py-10 xl:py-15 px-4 lg:px-8 xl:px-13">
                  <span class="group-hover:opacity-100 opacity-0 features-bg absolute w-full h-full left-0 top-0 -z-1"></span>
                  <span class="icon-border relative max-w-[80px] w-full h-20 rounded-full inline-flex items-center justify-center mb-8 mx-auto">
                    {/* <img src="images/icon-02.svg" alt="icon"> */}
                  </span>
                  <h4 class="font-semibold text-lg text-white mb-4">
                  Interactive Quizzes & Exercises
                  </h4>
                  <p class="font-medium">
                  Engage with quizzes, coding simulations, and gamified exercises that make learning fun and boost retention.
                  </p>
                </div>
              </div>

              {/* <!-- Features Item --> */}
              <div class="w-full sm:w-1/2 lg:w-1/3">
                <div class="group relative overflow-hidden text-center py-8 sm:py-10 xl:py-15 px-4 lg:px-8 xl:px-13">
                  <span class="group-hover:opacity-100 opacity-0 features-bg absolute w-full h-full left-0 top-0 -z-1"></span>
                  <span class="icon-border relative max-w-[80px] w-full h-20 rounded-full inline-flex items-center justify-center mb-8 mx-auto">
                    <img src="images/icon-03.svg" alt="icon" />
                  </span>
                  <h4 class="font-semibold text-lg text-white mb-4">
                  Cross-Platform Accessibility
                  </h4>
                  <p class="font-medium">
                  Access your courses anytime, anywhere, on both mobile and desktop devices, ensuring learning on the go.
                  </p>
                </div>
              </div>
            </div>

            <div class="features-row-border w-full h-[1px]"></div>

            {/* <!--=== Features Row ===--> */}
            <div class="flex flex-wrap justify-center">
              {/* <!-- Features Item --> */}
              <div class="w-full sm:w-1/2 lg:w-1/3">
                <div class="group relative overflow-hidden text-center py-8 sm:py-10 xl:py-15 px-4 lg:px-8 xl:px-13">
                  <span class="group-hover:opacity-100 opacity-0 features-bg absolute w-full h-full left-0 top-0 -z-1 rotate-180"></span>
                  <span class="icon-border relative max-w-[80px] w-full h-20 rounded-full inline-flex items-center justify-center mb-8 mx-auto">
                    <img src="images/icon-04.svg" alt="icon" />
                  </span>
                  <h4 class="font-semibold text-lg text-white mb-4">
                  Real-Time Progress Tracking
                  </h4>
                  <p class="font-medium">
                  Monitor your learning journey with real-time feedback and insights into your strengths and areas for improvement.
                  </p>
                </div>
              </div>

              {/* <!-- Features Item --> */}
              <div class="w-full sm:w-1/2 lg:w-1/3">
                <div class="group relative overflow-hidden text-center py-8 sm:py-10 xl:py-15 px-4 lg:px-8 xl:px-13">
                  <span class="group-hover:opacity-100 opacity-0 features-bg absolute w-full h-full left-0 top-0 -z-1 rotate-180"></span>
                  <span class="icon-border relative max-w-[80px] w-full h-20 rounded-full inline-flex items-center justify-center mb-8 mx-auto">
                    <img src="images/icon-05.svg" alt="icon" />
                  </span>
                  <h4 class="font-semibold text-lg text-white mb-4">
                  Eco-Friendly Learning
                  </h4>
                  <p class="font-medium">
                  Reduce paper waste and your carbon footprint by engaging with entirely digital courses, supporting a sustainable future.
                  </p>
                </div>
              </div>

              {/* <!-- Features Item --> */}
              <div class="w-full sm:w-1/2 lg:w-1/3">
                <div class="group relative overflow-hidden text-center py-8 sm:py-10 xl:py-15 px-4 lg:px-8 xl:px-13">
                  <span class="group-hover:opacity-100 opacity-0 features-bg absolute w-full h-full left-0 top-0 -z-1 rotate-180"></span>
                  <span class="icon-border relative max-w-[80px] w-full h-20 rounded-full inline-flex items-center justify-center mb-8 mx-auto">
                    <img src="images/icon-06.svg" alt="icon" />
                  </span>
                  <h4 class="font-semibold text-lg text-white mb-4">
                  Instant Feedback & Tips
                  </h4>
                  <p class="font-medium">
                  Receive immediate feedback on your progress and performance, helping you improve continuously.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
