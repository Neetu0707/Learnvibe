import React, { useRef } from "react";
import html2canvas from "html2canvas";

const ShowCertificate = ({ name, course,setShow }) => {
  const certificateRef = useRef(null);

  const handleDownload = async () => {
    if (certificateRef.current) {
      const canvas = await html2canvas(certificateRef.current, {
        scale: window.devicePixelRatio, // Higher resolution
        useCORS: true, // Ensures external images are captured
        allowTaint: true,
      });

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${name}-certificate.png`;
      link.click();
    }
  };

  return (
    <div className="fixed top-0 z-50 w-full h-screen flex justify-center items-center bg-[#1017398c] overflow-x-scroll">

    <button onClick={() => setShow(false)} className="absolute top-4 left-4 w-[40px] h-[40px] flex justify-center items-center text-[3vh] bg-red-500 text-white rounded-full shadow-lg">
        &times;
    </button>
      <div
        ref={certificateRef}
        className="relative bg-[#f0f0f0] scale-[50%] p-10 shadow-2xl w-[600px] text-center min-h-[80vh] min-w-[900px]"
      >
        <div className="absolute top-0 left-0">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/040/250/178/small/abstract-steel-blue-and-teal-banner-template-with-dynamic-background-curve-shapes-modern-dark-turquoise-business-webinar-banner-design-for-web-backdrop-brochure-website-landing-page-presentation-vector.jpg"
            alt=""
          />
        </div>
        <div className="absolute bottom-0 right-0 rotate-180">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/040/250/178/small/abstract-steel-blue-and-teal-banner-template-with-dynamic-background-curve-shapes-modern-dark-turquoise-business-webinar-banner-design-for-web-backdrop-brochure-website-landing-page-presentation-vector.jpg"
            alt=""
          />
        </div>
        <div className="absolute top-0 right-0 w-full h-full z-20 flex justify-center items-center">
          <div className="w-[80%] border-3 border-gray-800 flex flex-col items-center">
            <h2 className="text-4xl font-bold">CERTIFICATE OF COMPLETION</h2>
            <p className="mt-2 text-gray-500">
              THIS CERTIFICATE IS PROUDLY PRESENTED TO
            </p>

            <h1 className="text-3xl font-bold mt-4 text-[#101739]">{name}</h1>

            <p className="mt-2 text-lg text-gray-600">in {course}</p>
            <p className="mt-2 text-gray-500">
              For successfully completing a free online course
            </p>

            <div className="flex justify-between mt-6 min-w-[500px]">
              <div className="text-center flex flex-col items-center">
              <img src="/images/neetu.svg" alt="" className="h-[50px]" />
                <div className="w-32 h-0.5 bg-gray-600 mx-auto">
                </div>
                <p className="text-sm font-semibold mt-1">Neetu Sahu</p>
                <p className="text-xs text-gray-500">REPRESENTATIVE</p>
              </div>
              <div>
                <img src="/images/learnvibe.png" alt="" className="w-[100px]" />
              </div>
              <div className="text-center flex flex-col items-center">
              <img src="/images/neetu.svg" alt="" className="h-[50px]" />
                <div className="w-32 h-0.5 bg-gray-600 mx-auto"></div>
                <p className="text-sm font-semibold mt-1">Pragya Borse</p>
                <p className="text-xs text-gray-500">REPRESENTATIVE</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="absolute top-10 right-4 px-5 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
      >
        Download Certificate
      </button>
    </div>
  );
};

export default ShowCertificate;
