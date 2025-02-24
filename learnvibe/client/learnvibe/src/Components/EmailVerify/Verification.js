import React, { useState,useRef  } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Verification = () => {
    const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [step, setStep] = useState(1);
  const otpInputs = useRef([]);
  const navigate = useNavigate();


  const sendOtp = async () => {
    try {
      if (!email) {
        return toast.error("Email is required");
      }
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/sendotp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email }),
        }
      );

      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
        setStep(2);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next field
    if (value !== "" && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

 const submitOtp = async () => {
    try {
      if (!email) {
        return toast.error("Email is required");
      }
      const fullOtp = otp.join("");
      if (fullOtp.length < 6) {
        return toast.error("Enter complete OTP");
      }

      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/verifyotp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, otp: fullOtp }),
        }
      );

      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
        setStep(1);
        navigate('/');
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  return (
    <>
      <div className="w-screen min-h-screen flex justify-center items-center relative overflow-hidden">
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

        <div className="absolute p-5 min-w-screen h-full flex justify-center items-center">
          <div className="lg:w-[600px] min-w-[350px] h-[600px] border-2 border-gray-800 rounded-lg flex flex-col justify-center items-center shadow-2xl">
            {step === 1 && (
              <>
                <h1 className="text-4xl font-bold text-gray-300">
                  Verify Your Email
                </h1>

                <div className="w-[80%] flex flex-col gap-4 mt-10">
                  <label htmlFor="email">Enter Your Email</label>

                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-700 w-full h-[40px] rounded-[5px]
                  focus:outline-dashed pl-5 bg-gray-800"
                    autoComplete="on"
                  />

                  <button
                    className="bg-blue-700 text-white w-full h-[40px] rounded-[5px] hover:bg-blue-800"
                    onClick={sendOtp}
                  >
                    Submit
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h1 className="text-4xl font-bold text-gray-300">
                  Verify Your Email
                </h1>

                <div className="w-[80%] flex flex-col gap-4 mt-10">
                  <label htmlFor="email">Enter OTP</label>

                  <div className="w-full flex justify-center gap-4">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (otpInputs.current[index] = el)}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-[40px] h-[50px] border border-gray-700 rounded-[5px] text-center focus:outline-dashed bg-gray-800"
                      />
                    ))}
                  </div>

                  <button
                    className="bg-blue-700 text-white w-full h-[40px] rounded-[5px] hover:bg-blue-800"
                    onClick={submitOtp}
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Verification;
