import React, { useState, useEffect } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

const AllCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/upload/getfile`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await res.json();
        setCourses(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };
    
    getCourses();
  }, []);

  return (
    <section className="w-[350px] min-h-[40vh] bg-black/30 backdrop-blur-md p-4 text-white rounded-lg">
      <span className="text-lg font-semibold">All Courses</span>

      <div className="w-full min-h-fit mt-4 flex flex-col gap-3">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="w-full min-h-[50px] rounded-md border border-gray-800 flex justify-between items-center px-4 py-2 bg-black/20 backdrop-blur-md animate-pulse">
              <div className="w-1/3 h-4 bg-gray-700 rounded"></div>
              <div className="flex gap-2">
                <div className="w-6 h-6 bg-gray-700 rounded"></div>
                <div className="w-6 h-6 bg-gray-700 rounded"></div>
              </div>
            </div>
          ))
        ) : (
          courses.map((course, index) => (
            <div key={index} className="w-full min-h-[50px] rounded-md border border-gray-800 flex justify-between items-center px-4 py-2 bg-black/20 backdrop-blur-md">
              <span>{course.file_data.courseName}</span>
              <div className="flex gap-2">
                <IconButton color="primary">
                  <UploadIcon />
                </IconButton>
                <IconButton color="error">
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default AllCourse;
