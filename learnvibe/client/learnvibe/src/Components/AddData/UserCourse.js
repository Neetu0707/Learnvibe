import React, { useEffect, useState } from "react";

const UserCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/upload/getusercourse`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await res.json();
        console.log(data)
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    getCourses();
  }, []);

  return (
    <section className="lg:w-[600px] w-[300px] min-h-[40vh] bg-black/30 backdrop-blur-md p-4 text-white rounded-lg">
      <span className="text-lg font-semibold">User Courses</span>

      {loading ? (
        <p className="text-center mt-4">Loading courses...</p>
      ) : (
        <div className="overflow-x-auto mt-4">
          <table className="w-full border-collapse border border-gray-300 text-white">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-500 px-3 py-2">Username</th>
                <th className="border border-gray-500 px-3 py-2">Course</th>
              </tr>
            </thead>
            <tbody>
              {courses.length > 0 ? (
                courses.map((course, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-gray-500 px-3 py-2">
                    {course.user_email}
                    </td>
                    <td className="border border-gray-500 px-3 py-2">
                    {course.course_id}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No courses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default UserCourse;
