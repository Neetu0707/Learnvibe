import React from "react";
import Header from "../Header";
import AllCourse from "./AllCourse";
import UploadFile from "./UploadFile";
import UserCourse from "./UserCourse";
import { ToastContainer } from "react-toastify";
import AddCourse from "./AddCourse";

const AddData = () => {
  return (
    <>
      <Header />
      <section className="relative overflow-hidden min-h-screen z-10 pt-20 md:pt-24 lg:pt-28 scrollbar-hide">
        {/* Background Elements */}
        <div className="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
          <div className="absolute -top-[128%] sm:-top-[107%] xl:-top-[73%] left-1/2 -translate-x-1/2 w-full h-[1282px] max-w-[1282px] rounded-full hero-circle-gradient"></div>
          <div className="absolute -top-[112%] sm:-top-[93%] xl:-top-[62%] left-1/2 -translate-x-1/2 w-full h-[1046px] max-w-[1046px] rounded-full hero-circle-gradient"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2">
            <img src="images/blur-02.svg" alt="blur" className="max-w-none" />
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2">
            <img src="images/blur-01.svg" alt="blur" className="max-w-none" />
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full flex flex-col lg:flex-row  gap-5 flex-wrap px-4 sm:px-6 lg:px-20 overflow-y-auto max-h-[90vh] scrollbar-hide">
          <div className="w-fit flex flex-col md:flex-row flex-wrap gap-6">
            <AllCourse />
            <UploadFile />
            <UserCourse />
          </div>
          
          <div className="w-fit flex flex-col md:flex-row flex-wrap gap-6">
          <AddCourse/>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default AddData;
