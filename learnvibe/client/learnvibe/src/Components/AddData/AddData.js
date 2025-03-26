import React, { useState } from "react";
import Header from "../Header";
import AllCourse from "./AllCourse";
import UploadFile from "./UploadFile";
import { toast, ToastContainer } from "react-toastify";
import UserCourse from "./UserCourse";

const AddData = () => {

  return (
    <>
      <Header />
      <section
        id="home"
        className="relative overflow-hidden h-screen z-10 pt-35 md:pt-40 xl:pt-45"
      >
        <div className="absolute -z-10 pointer-events-none inset-0 overflow-hidden -mx-28">
          <div className="absolute -z-1 -top-[128%] sm:-top-[107%] xl:-top-[73%] left-1/2 -translate-x-1/2 -u-z-10 hero-circle-gradient w-full h-[1282px] rounded-full max-w-[1282px]"></div>
          <div className="absolute -z-1 -top-[112%] sm:-top-[93%] xl:-top-[62%] left-1/2 -translate-x-1/2 -u-z-10 hero-circle-gradient w-full h-[1046px] rounded-full max-w-[1046px]"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -u-z-10">
            <img src="images/blur-02.svg" alt="blur" className="max-w-none" />
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -u-z-10">
            <img src="images/blur-01.svg" alt="blur" className="max-w-none" />
          </div>
        </div>

        <div className="w-full xl:p-20 p-5 pt-0 flex flex-col xl:flex-row flex-wrap gap-5 justify-center items-center overflow-auto">
          <AllCourse />
          <UploadFile/>
          <UserCourse/>
        </div>

        
      </section>
      <ToastContainer />
    </>
  );
};

export default AddData;
