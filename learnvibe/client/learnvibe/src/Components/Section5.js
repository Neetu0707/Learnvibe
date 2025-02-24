import React, { useState, useEffect, useRef } from "react";

const Section5 = () => {
  const [showContent, setShowContent] = useState(false);
  const [scrollContent, setScrollContent] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const offsetTop = containerRef.current.offsetTop;
        setScrollContent(window.scrollY > offsetTop - 500);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <section
        x-data="{ 'showContent': false, 'scrollContent': false, }"
        class="relative z-20 overflow-hidden pt-22.5 lg:pt-27.5 xl:pt-32.5 2xl:pt-45 pb-20"
      >
        <div class="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          {/* <!-- section title --> */}
          <div
            class="wow fadeInUp mb-15 text-center"
            style={{ visibility: "visible" }}
          >
            <span class="hero-subtitle-gradient relative mb-4 font-medium text-sm inline-flex items-center gap-2 py-2 px-4.5 rounded-full">
              <img src="images/icon-title.svg" alt="icon" />

              <span class="hero-subtitle-text"> Wall of love </span>
            </span>
            <h2 class="text-white mb-4.5 text-2xl font-extrabold sm:text-4xl xl:text-heading-2">
              What Our User Says
            </h2>
            <p class="max-w-[714px] mx-auto font-medium">
              Our AI writing tool is designed to empower you with exceptional
              writing capabilities, making the writing process more efficient,
              accurate, and enjoyable.
            </p>
          </div>
          <div
            ref={containerRef}
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7.5 ${
              !showContent ? "max-h-[855px] overflow-hidden" : ""
            }`}
          >
            {/* <!-- user column --> */}
            <div class="space-y-7.5">
              {/* <!-- user item --> */}
              <div class="user-border-gradient relative overflow-hidden px-8 py-9 rounded-[19px]">
                <div class="flex items-center gap-4.5">
                  <div class="max-w-[48px] w-full h-12 rounded-full">
                    <img src="images/user-01.png" alt="user" />
                  </div>
                  <div>
                    <h5 class="text-white text-sm font-medium">
                      Machel Pildium
                    </h5>
                    <p class="font-medium text-sm">@machel</p>
                  </div>
                </div>

                <div class="user-divider relative my-6 w-full h-[1px]"></div>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's.
                </p>

                {/* <!-- bg shapes --> */}
                <div class="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
                  <span class="absolute right-0 bottom-0 -z-1">
                    <img
                      src="images/blur-18.svg"
                      alt="blur"
                      class="max-w-none"
                    />
                  </span>
                </div>
              </div>

              {/* <!-- user item --> */}
              <div class="user-border-gradient relative overflow-hidden px-8 py-9 rounded-[19px]">
                <div class="flex items-center gap-4.5">
                  <div class="max-w-[48px] w-full h-12 rounded-full">
                    <img src="images/user-02.png" alt="user" />
                  </div>
                  <div>
                    <h5 class="text-white text-sm font-medium">Wilson Bator</h5>
                    <p class="font-medium text-sm">@wilson</p>
                  </div>
                </div>

                <div class="user-divider relative my-6 w-full h-[1px]"></div>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's.
                </p>

                <p class="mt-6">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>

                {/* <!-- bg shapes --> */}
                <div class="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
                  <span class="absolute right-0 bottom-0 -z-1">
                    <img
                      src="images/blur-18.svg"
                      alt="blur"
                      class="max-w-none"
                    />
                  </span>
                </div>
              </div>

              {/* <!-- user item --> */}
              <div class="user-border-gradient relative overflow-hidden px-8 py-9 rounded-[19px]">
                <div class="flex items-center gap-4.5">
                  <div class="max-w-[48px] w-full h-12 rounded-full">
                    <img src="images/user-03.png" alt="user" />
                  </div>
                  <div>
                    <h5 class="text-white text-sm font-medium">Roger George</h5>
                    <p class="font-medium text-sm">@roger</p>
                  </div>
                </div>

                <div class="user-divider relative my-6 w-full h-[1px]"></div>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's.
                </p>

                {/* <!-- bg shapes --> */}
                <div class="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
                  <span class="absolute right-0 bottom-0 -z-1">
                    <img
                      src="images/blur-18.svg"
                      alt="blur"
                      class="max-w-none"
                    />
                  </span>
                </div>
              </div>

              {/* <!-- user item --> */}
              <div class="user-border-gradient relative overflow-hidden px-8 py-9 rounded-[19px]">
                <div class="flex items-center gap-4.5">
                  <div class="max-w-[48px] w-full h-12 rounded-full">
                    <img src="images/user-04.png" alt="user" />
                  </div>
                  <div>
                    <h5 class="text-white text-sm font-medium">Adison Dias</h5>
                    <p class="font-medium text-sm">@adison</p>
                  </div>
                </div>

                <div class="user-divider relative my-6 w-full h-[1px]"></div>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's.
                </p>

                <p class="mt-6">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>

                {/* <!-- bg shapes --> */}
                <div class="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
                  <span class="absolute right-0 bottom-0 -z-1">
                    <img
                      src="images/blur-18.svg"
                      alt="blur"
                      class="max-w-none"
                    />
                  </span>
                </div>
              </div>

              {/* <!-- user item --> */}
              <div class="user-border-gradient relative overflow-hidden px-8 py-9 rounded-[19px]">
                <div class="flex items-center gap-4.5">
                  <div class="max-w-[48px] w-full h-12 rounded-full">
                    <img src="images/user-05.png" alt="user" />
                  </div>
                  <div>
                    <h5 class="text-white text-sm font-medium">
                      Abram Lipshutz
                    </h5>
                    <p class="font-medium text-sm">@abram</p>
                  </div>
                </div>

                <div class="user-divider relative my-6 w-full h-[1px]"></div>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's.
                </p>

                {/* <!-- bg shapes --> */}
                <div class="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
                  <span class="absolute right-0 bottom-0 -z-1">
                    <img
                      src="images/blur-18.svg"
                      alt="blur"
                      class="max-w-none"
                    />
                  </span>
                </div>
              </div>

              {/* <!-- user item --> */}
              <div class="user-border-gradient relative overflow-hidden px-8 py-9 rounded-[19px]">
                <div class="flex items-center gap-4.5">
                  <div class="max-w-[48px] w-full h-12 rounded-full">
                    <img src="images/user-06.png" alt="user" />
                  </div>
                  <div>
                    <h5 class="text-white text-sm font-medium">Jaylon Press</h5>
                    <p class="font-medium text-sm">@jaylon</p>
                  </div>
                </div>

                <div class="user-divider relative my-6 w-full h-[1px]"></div>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's.
                </p>

                {/* <!-- bg shapes --> */}
                <div class="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
                  <span class="absolute right-0 bottom-0 -z-1">
                    <img
                      src="images/blur-18.svg"
                      alt="blur"
                      class="max-w-none"
                    />
                  </span>
                </div>
              </div>

              {/* <!-- user item --> */}
              <div class="user-border-gradient relative overflow-hidden px-8 py-9 rounded-[19px]">
                <div class="flex items-center gap-4.5">
                  <div class="max-w-[48px] w-full h-12 rounded-full">
                    <img src="images/user-07.png" alt="user" />
                  </div>
                  <div>
                    <h5 class="text-white text-sm font-medium">Zain Franci</h5>
                    <p class="font-medium text-sm">@zain</p>
                  </div>
                </div>

                <div class="user-divider relative my-6 w-full h-[1px]"></div>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's.
                </p>

                {/* <!-- bg shapes --> */}
                <div class="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
                  <span class="absolute right-0 bottom-0 -z-1">
                    <img
                      src="images/blur-18.svg"
                      alt="blur"
                      class="max-w-none"
                    />
                  </span>
                </div>
              </div>

              {/* <!-- user item --> */}
              <div class="user-border-gradient relative overflow-hidden px-8 py-9 rounded-[19px]">
                <div class="flex items-center gap-4.5">
                  <div class="max-w-[48px] w-full h-12 rounded-full">
                    <img src="images/user-08.png" alt="user" />
                  </div>
                  <div>
                    <h5 class="text-white text-sm font-medium">
                      Cristofer Carder
                    </h5>
                    <p class="font-medium text-sm">@cristofer</p>
                  </div>
                </div>

                <div class="user-divider relative my-6 w-full h-[1px]"></div>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's.
                </p>

                {/* <!-- bg shapes --> */}
                <div class="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
                  <span class="absolute right-0 bottom-0 -z-1">
                    <img
                      src="images/blur-18.svg"
                      alt="blur"
                      class="max-w-none"
                    />
                  </span>
                </div>
              </div>

              {/* <!-- user item --> */}
              <div class="user-border-gradient relative overflow-hidden px-8 py-9 rounded-[19px]">
                <div class="flex items-center gap-4.5">
                  <div class="max-w-[48px] w-full h-12 rounded-full">
                    <img src="images/user-09.png" alt="user" />
                  </div>
                  <div>
                    <h5 class="text-white text-sm font-medium">Dulce Rosser</h5>
                    <p class="font-medium text-sm">@dulce</p>
                  </div>
                </div>

                <div class="user-divider relative my-6 w-full h-[1px]"></div>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's.
                </p>

                <p class="mt-6">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>

                {/* <!-- bg shapes --> */}
                <div class="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
                  <span class="absolute right-0 bottom-0 -z-1">
                    <img
                      src="images/blur-18.svg"
                      alt="blur"
                      class="max-w-none"
                    />
                  </span>
                </div>
              </div>
            </div>

            {/* <!-- user column --> */}
            <div class="space-y-7.5 hidden sm:block">
              {/* <!-- user item --> */}
              <div class="user-border-gradient relative overflow-hidden px-8 py-9 rounded-[19px]">
                <div class="flex items-center gap-4.5">
                  <div class="max-w-[48px] w-full h-12 rounded-full">
                    <img src="images/user-04.png" alt="user" />
                  </div>
                  <div>
                    <h5 class="text-white text-sm font-medium">Adison Dias</h5>
                    <p class="font-medium text-sm">@adison</p>
                  </div>
                </div>

                <div class="user-divider relative my-6 w-full h-[1px]"></div>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's.
                </p>

                <p class="mt-6">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>

                {/* <!-- bg shapes --> */}
                <div class="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
                  <span class="absolute right-0 bottom-0 -z-1">
                    <img
                      src="images/blur-18.svg"
                      alt="blur"
                      class="max-w-none"
                    />
                  </span>
                </div>
              </div>

              {/* <!-- user item --> */}
              <div class="user-border-gradient relative overflow-hidden px-8 py-9 rounded-[19px]">
                <div class="flex items-center gap-4.5">
                  <div class="max-w-[48px] w-full h-12 rounded-full">
                    <img src="images/user-05.png" alt="user" />
                  </div>
                  <div>
                    <h5 class="text-white text-sm font-medium">
                      Abram Lipshutz
                    </h5>
                    <p class="font-medium text-sm">@abram</p>
                  </div>
                </div>

                <div class="user-divider relative my-6 w-full h-[1px]"></div>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's.
                </p>

                {/* <!-- bg shapes --> */}
                <div class="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
                  <span class="absolute right-0 bottom-0 -z-1">
                    <img
                      src="images/blur-18.svg"
                      alt="blur"
                      class="max-w-none"
                    />
                  </span>
                </div>
              </div>

              {/* <!-- user item --> */}
              <div class="user-border-gradient relative overflow-hidden px-8 py-9 rounded-[19px]">
                <div class="flex items-center gap-4.5">
                  <div class="max-w-[48px] w-full h-12 rounded-full">
                    <img src="images/user-06.png" alt="user" />
                  </div>
                  <div>
                    <h5 class="text-white text-sm font-medium">Jaylon Press</h5>
                    <p class="font-medium text-sm">@jaylon</p>
                  </div>
                </div>

                <div class="user-divider relative my-6 w-full h-[1px]"></div>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's.
                </p>

                {/* <!-- bg shapes --> */}
                <div class="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
                  <span class="absolute right-0 bottom-0 -z-1">
                    <img
                      src="images/blur-18.svg"
                      alt="blur"
                      class="max-w-none"
                    />
                  </span>
                </div>
              </div>

              {/* <!-- user item --> */}
              <div class="user-border-gradient relative overflow-hidden px-8 py-9 rounded-[19px]">
                <div class="flex items-center gap-4.5">
                  <div class="max-w-[48px] w-full h-12 rounded-full">
                    <img src="images/user-07.png" alt="user" />
                  </div>
                  <div>
                    <h5 class="text-white text-sm font-medium">Zain Franci</h5>
                    <p class="font-medium text-sm">@zain</p>
                  </div>
                </div>

                <div class="user-divider relative my-6 w-full h-[1px]"></div>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's.
                </p>

                {/* <!-- bg shapes --> */}
                <div class="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
                  <span class="absolute right-0 bottom-0 -z-1">
                    <img
                      src="images/blur-18.svg"
                      alt="blur"
                      class="max-w-none"
                    />
                  </span>
                </div>
              </div>

              {/* <!-- user item --> */}
              <div class="user-border-gradient relative overflow-hidden px-8 py-9 rounded-[19px]">
                <div class="flex items-center gap-4.5">
                  <div class="max-w-[48px] w-full h-12 rounded-full">
                    <img src="images/user-08.png" alt="user" />
                  </div>
                  <div>
                    <h5 class="text-white text-sm font-medium">
                      Cristofer Carder
                    </h5>
                    <p class="font-medium text-sm">@cristofer</p>
                  </div>
                </div>

                <div class="user-divider relative my-6 w-full h-[1px]"></div>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's.
                </p>

                {/* <!-- bg shapes --> */}
                <div class="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
                  <span class="absolute right-0 bottom-0 -z-1">
                    <img
                      src="images/blur-18.svg"
                      alt="blur"
                      class="max-w-none"
                    />
                  </span>
                </div>
              </div>

              {/* <!-- user item --> */}
              <div class="user-border-gradient relative overflow-hidden px-8 py-9 rounded-[19px]">
                <div class="flex items-center gap-4.5">
                  <div class="max-w-[48px] w-full h-12 rounded-full">
                    <img src="images/user-09.png" alt="user" />
                  </div>
                  <div>
                    <h5 class="text-white text-sm font-medium">Dulce Rosser</h5>
                    <p class="font-medium text-sm">@dulce</p>
                  </div>
                </div>

                <div class="user-divider relative my-6 w-full h-[1px]"></div>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's.
                </p>

                <p class="mt-6">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>

                {/* <!-- bg shapes --> */}
                <div class="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
                  <span class="absolute right-0 bottom-0 -z-1">
                    <img
                      src="images/blur-18.svg"
                      alt="blur"
                      class="max-w-none"
                    />
                  </span>
                </div>
              </div>

              {/* <!-- user item --> */}
              <div class="user-border-gradient relative overflow-hidden px-8 py-9 rounded-[19px]">
                <div class="flex items-center gap-4.5">
                  <div class="max-w-[48px] w-full h-12 rounded-full">
                    <img src="images/user-01.png" alt="user" />
                  </div>
                  <div>
                    <h5 class="text-white text-sm font-medium">
                      Machel Pildium
                    </h5>
                    <p class="font-medium text-sm">@machel</p>
                  </div>
                </div>

                <div class="user-divider relative my-6 w-full h-[1px]"></div>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's.
                </p>

                {/* <!-- bg shapes --> */}
                <div class="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
                  <span class="absolute right-0 bottom-0 -z-1">
                    <img
                      src="images/blur-18.svg"
                      alt="blur"
                      class="max-w-none"
                    />
                  </span>
                </div>
              </div>

              {/* <!-- user item --> */}
              <div class="user-border-gradient relative overflow-hidden px-8 py-9 rounded-[19px]">
                <div class="flex items-center gap-4.5">
                  <div class="max-w-[48px] w-full h-12 rounded-full">
                    <img src="images/user-02.png" alt="user" />
                  </div>
                  <div>
                    <h5 class="text-white text-sm font-medium">Wilson Bator</h5>
                    <p class="font-medium text-sm">@wilson</p>
                  </div>
                </div>

                <div class="user-divider relative my-6 w-full h-[1px]"></div>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's.
                </p>

                <p class="mt-6">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>

                {/* <!-- bg shapes --> */}
                <div class="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
                  <span class="absolute right-0 bottom-0 -z-1">
                    <img
                      src="images/blur-18.svg"
                      alt="blur"
                      class="max-w-none"
                    />
                  </span>
                </div>
              </div>

              {/* <!-- user item --> */}
              <div class="user-border-gradient relative overflow-hidden px-8 py-9 rounded-[19px]">
                <div class="flex items-center gap-4.5">
                  <div class="max-w-[48px] w-full h-12 rounded-full">
                    <img src="images/user-03.png" alt="user" />
                  </div>
                  <div>
                    <h5 class="text-white text-sm font-medium">Roger George</h5>
                    <p class="font-medium text-sm">@roger</p>
                  </div>
                </div>

                <div class="user-divider relative my-6 w-full h-[1px]"></div>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's.
                </p>

                {/* <!-- bg shapes --> */}
                <div class="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
                  <span class="absolute right-0 bottom-0 -z-1">
                    <img
                      src="images/blur-18.svg"
                      alt="blur"
                      class="max-w-none"
                    />
                  </span>
                </div>
              </div>
            </div>

            {/* <!-- user column --> */}
            <div class="space-y-7.5 hidden lg:block">
              {/* <!-- user item --> */}
              <div class="user-border-gradient relative overflow-hidden px-8 py-9 rounded-[19px]">
                <div class="flex items-center gap-4.5">
                  <div class="max-w-[48px] w-full h-12 rounded-full">
                    <img src="images/user-07.png" alt="user" />
                  </div>
                  <div>
                    <h5 class="text-white text-sm font-medium">Zain Franci</h5>
                    <p class="font-medium text-sm">@zain</p>
                  </div>
                </div>

                <div class="user-divider relative my-6 w-full h-[1px]"></div>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's.
                </p>

                {/* <!-- bg shapes --> */}
                <div class="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
                  <span class="absolute right-0 bottom-0 -z-1">
                    <img
                      src="images/blur-18.svg"
                      alt="blur"
                      class="max-w-none"
                    />
                  </span>
                </div>
              </div>

              {/* <!-- user item --> */}
              <div class="user-border-gradient relative overflow-hidden px-8 py-9 rounded-[19px]">
                <div class="flex items-center gap-4.5">
                  <div class="max-w-[48px] w-full h-12 rounded-full">
                    <img src="images/user-08.png" alt="user" />
                  </div>
                  <div>
                    <h5 class="text-white text-sm font-medium">
                      Cristofer Carder
                    </h5>
                    <p class="font-medium text-sm">@cristofer</p>
                  </div>
                </div>

                <div class="user-divider relative my-6 w-full h-[1px]"></div>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's.
                </p>

                {/* <!-- bg shapes --> */}
                <div class="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
                  <span class="absolute right-0 bottom-0 -z-1">
                    <img
                      src="images/blur-18.svg"
                      alt="blur"
                      class="max-w-none"
                    />
                  </span>
                </div>
              </div>

              {/* <!-- user item --> */}
              <div class="user-border-gradient relative overflow-hidden px-8 py-9 rounded-[19px]">
                <div class="flex items-center gap-4.5">
                  <div class="max-w-[48px] w-full h-12 rounded-full">
                    <img src="images/user-09.png" alt="user" />
                  </div>
                  <div>
                    <h5 class="text-white text-sm font-medium">Dulce Rosser</h5>
                    <p class="font-medium text-sm">@dulce</p>
                  </div>
                </div>

                <div class="user-divider relative my-6 w-full h-[1px]"></div>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's.
                </p>

                <p class="mt-6">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>

                {/* <!-- bg shapes --> */}
                <div class="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
                  <span class="absolute right-0 bottom-0 -z-1">
                    <img
                      src="images/blur-18.svg"
                      alt="blur"
                      class="max-w-none"
                    />
                  </span>
                </div>
              </div>

              {/* <!-- user item --> */}
              <div class="user-border-gradient relative overflow-hidden px-8 py-9 rounded-[19px]">
                <div class="flex items-center gap-4.5">
                  <div class="max-w-[48px] w-full h-12 rounded-full">
                    <img src="images/user-01.png" alt="user" />
                  </div>
                  <div>
                    <h5 class="text-white text-sm font-medium">
                      Machel Pildium
                    </h5>
                    <p class="font-medium text-sm">@machel</p>
                  </div>
                </div>

                <div class="user-divider relative my-6 w-full h-[1px]"></div>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's.
                </p>

                {/* <!-- bg shapes --> */}
                <div class="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
                  <span class="absolute right-0 bottom-0 -z-1">
                    <img
                      src="images/blur-18.svg"
                      alt="blur"
                      class="max-w-none"
                    />
                  </span>
                </div>
              </div>

              {/* <!-- user item --> */}
              <div class="user-border-gradient relative overflow-hidden px-8 py-9 rounded-[19px]">
                <div class="flex items-center gap-4.5">
                  <div class="max-w-[48px] w-full h-12 rounded-full">
                    <img src="images/user-02.png" alt="user" />
                  </div>
                  <div>
                    <h5 class="text-white text-sm font-medium">Wilson Bator</h5>
                    <p class="font-medium text-sm">@wilson</p>
                  </div>
                </div>

                <div class="user-divider relative my-6 w-full h-[1px]"></div>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's.
                </p>

                <p class="mt-6">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>

                {/* <!-- bg shapes --> */}
                <div class="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
                  <span class="absolute right-0 bottom-0 -z-1">
                    <img
                      src="images/blur-18.svg"
                      alt="blur"
                      class="max-w-none"
                    />
                  </span>
                </div>
              </div>

              {/* <!-- user item --> */}
              <div class="user-border-gradient relative overflow-hidden px-8 py-9 rounded-[19px]">
                <div class="flex items-center gap-4.5">
                  <div class="max-w-[48px] w-full h-12 rounded-full">
                    <img src="images/user-03.png" alt="user" />
                  </div>
                  <div>
                    <h5 class="text-white text-sm font-medium">Roger George</h5>
                    <p class="font-medium text-sm">@roger</p>
                  </div>
                </div>

                <div class="user-divider relative my-6 w-full h-[1px]"></div>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's.
                </p>

                {/* <!-- bg shapes --> */}
                <div class="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
                  <span class="absolute right-0 bottom-0 -z-1">
                    <img
                      src="images/blur-18.svg"
                      alt="blur"
                      class="max-w-none"
                    />
                  </span>
                </div>
              </div>

              {/* <!-- user item --> */}
              <div class="user-border-gradient relative overflow-hidden px-8 py-9 rounded-[19px]">
                <div class="flex items-center gap-4.5">
                  <div class="max-w-[48px] w-full h-12 rounded-full">
                    <img src="images/user-04.png" alt="user" />
                  </div>
                  <div>
                    <h5 class="text-white text-sm font-medium">Adison Dias</h5>
                    <p class="font-medium text-sm">@adison</p>
                  </div>
                </div>

                <div class="user-divider relative my-6 w-full h-[1px]"></div>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's.
                </p>

                <p class="mt-6">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>

                {/* <!-- bg shapes --> */}
                <div class="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
                  <span class="absolute right-0 bottom-0 -z-1">
                    <img
                      src="images/blur-18.svg"
                      alt="blur"
                      class="max-w-none"
                    />
                  </span>
                </div>
              </div>

              {/* <!-- user item --> */}
              <div class="user-border-gradient relative overflow-hidden px-8 py-9 rounded-[19px]">
                <div class="flex items-center gap-4.5">
                  <div class="max-w-[48px] w-full h-12 rounded-full">
                    <img src="images/user-05.png" alt="user" />
                  </div>
                  <div>
                    <h5 class="text-white text-sm font-medium">
                      Abram Lipshutz
                    </h5>
                    <p class="font-medium text-sm">@abram</p>
                  </div>
                </div>

                <div class="user-divider relative my-6 w-full h-[1px]"></div>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's.
                </p>

                {/* <!-- bg shapes --> */}
                <div class="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
                  <span class="absolute right-0 bottom-0 -z-1">
                    <img
                      src="images/blur-18.svg"
                      alt="blur"
                      class="max-w-none"
                    />
                  </span>
                </div>
              </div>

              {/* <!-- user item --> */}
              <div class="user-border-gradient relative overflow-hidden px-8 py-9 rounded-[19px]">
                <div class="flex items-center gap-4.5">
                  <div class="max-w-[48px] w-full h-12 rounded-full">
                    <img src="images/user-06.png" alt="user" />
                  </div>
                  <div>
                    <h5 class="text-white text-sm font-medium">Jaylon Press</h5>
                    <p class="font-medium text-sm">@jaylon</p>
                  </div>
                </div>

                <div class="user-divider relative my-6 w-full h-[1px]"></div>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's.
                </p>

                {/* <!-- bg shapes --> */}
                <div class="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
                  <span class="absolute right-0 bottom-0 -z-1">
                    <img
                      src="images/blur-18.svg"
                      alt="blur"
                      class="max-w-none"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`inset-x-0 bottom-20 flex justify-center bg-gradient-to-t from-dark pt-32 pb-8 pointer-events-none absolute ${
              showContent
                ? "sticky -u-mt-52 transition-opacity duration-300 opacity-0"
                : ""
            } ${scrollContent ? "!opacity-100" : ""}`}
          >
            <button
              className={`button-border-gradient hover:button-gradient-hover relative top-20 text-sm text-white font-semibold px-4.5 py-3 rounded-lg pointer-events-auto flex mx-auto -mt-7.5 ease-in duration-300 ${
                showContent ? "transition-transform translate-y-4" : ""
              } ${scrollContent ? "translate-y-0" : ""}`}
              onClick={() => setShowContent(!showContent)}
              type="button"
            >
              {showContent ? "Okay, I get the point" : "Show more..."}
            </button>
          </div>
        </div>
      </section>
      <section class="py-19">
        <div class="max-w-[1104px] mx-auto px-4 sm:px-8 xl:px-0">
          <div class="relative overflow-hidden z-10">
            <span class="max-w-[128px] w-full h-[37px] block inset-0 pointer-events-none absolute z-10 left-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-dark/0 to-dark/100"></span>
            <span class="max-w-[128px] w-full h-[37px] block inset-0 pointer-events-none absolute z-10 left-auto top-1/2 -translate-y-1/2 bg-gradient-to-r from-dark/0 to-dark/100"></span>
            <div class="swiper clients-carousel swiper-initialized swiper-horizontal">
              <div
                class="swiper-wrapper items-center select-none !ease-linear"
                style={{
                    transitionDuration: "5000ms",
                    transform: "translate3d(-1083px, 0px, 0px)"
                  }}
              >
                <div
                  class="swiper-slide !w-auto"
                  data-swiper-slide-index="15"
                  style={{ marginRight: "64px" }}
                >
                  <a href="/#">
                    <img src="images/client-02.svg" alt="client" />
                  </a>
                </div>
                <div
                  class="swiper-slide !w-auto"
                  data-swiper-slide-index="16"
                 style={{ marginRight: "64px" }}
                >
                  <a href="/#">
                    <img src="images/client-03.svg" alt="client" />
                  </a>
                </div>
                <div
                  class="swiper-slide !w-auto"
                  data-swiper-slide-index="17"
                 style={{ marginRight: "64px" }}
                >
                  <a href="/#">
                    <img src="images/client-04.svg" alt="client" />
                  </a>
                </div>
                <div
                  class="swiper-slide !w-auto"
                  data-swiper-slide-index="18"
                 style={{ marginRight: "64px" }}
                >
                  <a href="/#">
                    <img src="images/client-05.svg" alt="client" />
                  </a>
                </div>
                <div
                  class="swiper-slide !w-auto"
                  data-swiper-slide-index="19"
                 style={{ marginRight: "64px" }}
                >
                  <a href="/#">
                    <img src="images/client-06.svg" alt="client" />
                  </a>
                </div>
                <div
                  class="swiper-slide !w-auto"
                  data-swiper-slide-index="20"
                 style={{ marginRight: "64px" }}
                >
                  <a href="/#">
                    <img class="mt-3" src="images/client-07.svg" alt="client" />
                  </a>
                </div>
                <div
                  class="swiper-slide !w-auto swiper-slide-prev"
                  data-swiper-slide-index="0"
                 style={{ marginRight: "64px" }}
                >
                  <a href="/#">
                    <img src="images/client-01.svg" alt="client" />
                  </a>
                </div>
                <div
                  class="swiper-slide !w-auto swiper-slide-active"
                  data-swiper-slide-index="1"
                 style={{ marginRight: "64px" }}
                >
                  <a href="/#">
                    <img src="images/client-02.svg" alt="client" />
                  </a>
                </div>
                <div
                  class="swiper-slide !w-auto swiper-slide-next"
                  data-swiper-slide-index="2"
                 style={{ marginRight: "64px" }}
                >
                  <a href="/#">
                    <img src="images/client-03.svg" alt="client" />
                  </a>
                </div>
                <div
                  class="swiper-slide !w-auto"
                  data-swiper-slide-index="3"
                 style={{ marginRight: "64px" }}
                >
                  <a href="/#">
                    <img src="images/client-04.svg" alt="client" />
                  </a>
                </div>
                <div
                  class="swiper-slide !w-auto"
                  data-swiper-slide-index="4"
                 style={{ marginRight: "64px" }}
                >
                  <a href="/#">
                    <img src="images/client-05.svg" alt="client" />
                  </a>
                </div>
                <div
                  class="swiper-slide !w-auto"
                  data-swiper-slide-index="5"
                 style={{ marginRight: "64px" }}
                >
                  <a href="/#">
                    <img src="images/client-06.svg" alt="client" />
                  </a>
                </div>
                <div
                  class="swiper-slide !w-auto"
                  data-swiper-slide-index="6"
                 style={{ marginRight: "64px" }}
                >
                  <a href="/#">
                    <img class="mt-3" src="images/client-07.svg" alt="client" />
                  </a>
                </div>
                <div
                  class="swiper-slide !w-auto"
                  data-swiper-slide-index="7"
                 style={{ marginRight: "64px" }}
                >
                  <a href="/#">
                    <img src="images/client-01.svg" alt="client" />
                  </a>
                </div>
                <div
                  class="swiper-slide !w-auto"
                  data-swiper-slide-index="8"
                 style={{ marginRight: "64px" }}
                >
                  <a href="/#">
                    <img src="images/client-02.svg" alt="client" />
                  </a>
                </div>
                <div
                  class="swiper-slide !w-auto"
                  data-swiper-slide-index="9"
                 style={{ marginRight: "64px" }}
                >
                  <a href="/#">
                    <img src="images/client-03.svg" alt="client" />
                  </a>
                </div>
                <div
                  class="swiper-slide !w-auto"
                  data-swiper-slide-index="10"
                 style={{ marginRight: "64px" }}
                >
                  <a href="/#">
                    <img src="images/client-04.svg" alt="client" />
                  </a>
                </div>
                <div
                  class="swiper-slide !w-auto"
                  data-swiper-slide-index="11"
                 style={{ marginRight: "64px" }}
                >
                  <a href="/#">
                    <img src="images/client-05.svg" alt="client" />
                  </a>
                </div>
                <div
                  class="swiper-slide !w-auto"
                  data-swiper-slide-index="12"
                 style={{ marginRight: "64px" }}
                >
                  <a href="/#">
                    <img src="images/client-06.svg" alt="client" />
                  </a>
                </div>
                <div
                  class="swiper-slide !w-auto"
                  data-swiper-slide-index="13"
                 style={{ marginRight: "64px" }}
                >
                  <a href="/#">
                    <img class="mt-3" src="images/client-07.svg" alt="client" />
                  </a>
                </div>
                <div
                  class="swiper-slide !w-auto"
                  data-swiper-slide-index="14"
                 style={{ marginRight: "64px" }}
                >
                  <a href="/#">
                    <img src="images/client-01.svg" alt="client" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Section5;
