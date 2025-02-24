import React, { useState } from "react";
import Header from "../Header";
import InputField from "./InputField";
import { toast, ToastContainer } from "react-toastify";

const AddData = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please select a JSON file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/upload/uploadfile`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const result = await response.json();
      console.log("Upload successful:", result);
      toast.success("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("File upload failed!");
    }
  };

  return (
    <>
      <Header />
      <section
        id="home"
        className="relative overflow-hidden h-screen z-10 pt-35 md:pt-40 xl:pt-45"
      >
        <div className="max-w-7xl mx-auto">
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
          <div className="w-full min-h-[40px] flex justify-center items-center">
            <span className="hero-subtitle-text">Upload Subject Data Here !!</span>
          </div>
        </div>

        <div className="w-full max-w-[800px] min-h-[40px] flex flex-col lg:flex-row gap-5 justify-center items-center p-4">
          <InputField
            courseName={"Upload Data File"}
            name={"file"}
            type={"file"}
            onFileSelect={handleFileSelect}
          />
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Submit
          </button>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default AddData;
