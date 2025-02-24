import React from "react";
import { Link } from "react-router-dom";

const Verifyemail = ({setShowVerifyEmail}) => {
  return (
    <div className="fixed bottom-4 right-4 animate-slideInOut blink bg-white p-4 rounded-lg flex justify-center items-center shadow-lg min-w-fit px-6 h-[60px] z-50 gap-4">
      <h1 className="text-black">
        <Link to={'/verifyemail'} className="text-blue-700 cursor-pointer"> Click Here!!   </Link> to verify your email{" "}
      </h1>

      <button className="text-[3vh] -mt-1" onClick={() => setShowVerifyEmail(false)}>
        &times;
      </button>
    </div>
  );
};

export default Verifyemail;
