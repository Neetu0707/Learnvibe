import React from "react";
import { toast, ToastContainer } from "react-toastify";

const InputField = ({ courseName, name, type, onFileSelect }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.type !== "application/json") {
        toast.error("Please select a JSON file.");
        event.target.value = ""; // Clear the input field
        return;
      }
      onFileSelect(file); // Pass the selected file to the parent component
    }
  };

  return (
    <>
      <div className="mb-9.5">
        <label htmlFor={name} className="text-white mb-2.5 block font-medium">
          {courseName}
        </label>
        <input
          id={name}
          type={type}
          name={name}
          className="rounded-lg border border-white/[0.12] bg-white/[0.05] focus:border-purple w-full py-3 px-6 outline-none"
          onChange={type === "file" ? handleFileChange : undefined}
        />
      </div>

      <ToastContainer />
    </>
  );
};

export default InputField;
