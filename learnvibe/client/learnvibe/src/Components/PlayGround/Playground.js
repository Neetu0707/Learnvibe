import React, { useState } from "react";

const Playground = () => {
  const [language, setLanguage] = useState("CPP");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState(""); // State to store the output

  // Default code snippets for each language
  const defaultCodeSnippets = {
    CPP: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
    Python: `print("Hello, World!")`,
    JavaScript: `console.log("Hello, World!");`,
  };

  const handleRun = async () => {
    try {
      setOutput(""); // Clear previous output

      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/code/uploadCode`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code, language }),
        }
      );

      const result = await res.json();
      console.log(result);
      setOutput(result.output);

      // alert("Code submitted successfully!");
    } catch (error) {
      console.error("Error running code:", error);
      setOutput(`Error: ${error.message}`);
    }
  };

  const handleSubmit = () => {
    try {
      console.log("Submitting code in", language);
      console.log(code);
      // Add your code submission logic here
      setOutput("Code submitted successfully!");
    } catch (error) {
      console.error("Error submitting code:", error);
      setOutput(`Error: ${error.message}`);
    }
  };

  const getMode = (language) => {
    switch (language) {
      case "Python":
        return "python";
      case "JavaScript":
        return "javascript";
      case "CPP":
        return "text/x-c++src"; // Better support for C++
      default:
        return "text/plain";
    }
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    setCode(defaultCodeSnippets[selectedLanguage]); // Set default code for the selected language
  };

  return (
    <>
      <div className="p-6 lg:flex flex-col justify-center items-center hidden">
        <div className="rounded-[2vh] gap-6 h-[10vh] w-[80%] flex justify-center items-center">
          <button
            className="px-8 py-2 rounded-[5px] bg-green-700 border border-gray-700 text-white hover:bg-green-800 transition-colors"
            onClick={handleRun}
          >
            Run
          </button>
          <button
            className="px-8 py-2 rounded-[5px] bg-red-800 border border-gray-700 text-white hover:bg-red-900 transition-colors"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>

        <div className="w-full flex gap-10">
          <div className="rounded-[2vh] border border-gray-700 h-[90vh] w-[50%] relative mt-6">
            <div className="rounded-[5px] p-4 m-4 w-fit py-2 absolute right-2 top-2 z-50 bg-gray-800">
              <select
                value={language}
                onChange={handleLanguageChange}
                className="px-4 py-2 rounded bg-gray-700 text-white"
              >
                <option value="CPP">C++</option>
                <option value="Python">Python</option>
                <option value="JavaScript">JavaScript</option>
                {/* Add more languages as needed */}
              </select>
            </div>

            <div className="p-4 min-h-full">
              <textarea
                className="w-full h-[85vh] rounded-[1.5vh] bg-gray-800 p-4 text-[#f0f0f0]"
                placeholder={`${defaultCodeSnippets[language]}`}
                value={code} // Bind state
                onChange={(e) => setCode(e.target.value)} // Update state
              />
            </div>
          </div>
          <div className="p-4 min-h-[90vh] rounded-[2vh] bg-gray-900 text-white overflow-auto w-[50%] mt-6">
            <h3 className="font-bold mb-2">Output:</h3>
            <pre>{output}</pre>
          </div>
        </div>
      </div>

      <div className="lg:hidden p-5 h-screen flex justify-center items-center text-center">
        <h1 className="text-4xl text-[#f0f0f0]">
          PlayGround in Not Supported in Small Devices !!
        </h1>
      </div>
    </>
  );
};

export default Playground;
