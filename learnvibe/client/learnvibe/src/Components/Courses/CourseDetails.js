import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Accordian from "./Accordian";
import ShowCertificate from "./ShowCertificate";
import { toast, ToastContainer } from "react-toastify";
import Sidebar from "./Sidebar";
import Quiz from "./Quizes";

const CourseDetails = () => {
  const { id } = useParams(); // Extract the `id` parameter from the URL
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(null); // Track selected chapter
  const [showQuiz, setShowQuiz] = useState(false); // Track if quiz is being viewed
  const [selectedTopic, setSelectedTopic] = useState(null); // Track selected topic
  const [showTopics, setShowTopics] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [course, setCourse] = useState([]);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [course_id, setCourse_id] = useState("");
  const [completed, setCompleted] = useState(0);
  const toggleSidebar = () => setShowTopics(!showTopics);

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("firebaseUser");
    if (storedUser) {
      // setToken(storedUser);
      setEmail(JSON.parse(storedUser).email);
    }
  });

  useEffect(() => {
    if (course?.file_data?.content?.chapters?.length > 0) {
      setSelectedChapterIndex(0); // Open the first chapter by default
      setSelectedTopic(course.file_data.content.chapters[0].topics[0]); // Select the first topic by default
    }
  }, [course]);

  const getCourses = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/upload/getfile`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const courses = await res.json();
    const normalizedId = id.replace(/\s+/g, "-");

    const course = courses.find(
      (course) =>
        course.file_data.courseName.replace(/\s+/g, "-") === normalizedId
    );

    setCourse(course);
    setLoading(false);
    console.log(course);
  };

  const handleChapterClick = (index) => {
    setSelectedChapterIndex(index);
    setSelectedTopic(null);
    setShowQuiz(false); // Reset quiz view when switching chapters
  };

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    setShowQuiz(false); // Hide quiz when a topic is selected
    setShowTopics(false);
  };

  const handleQuizClick = () => {
    setShowQuiz(true);
    setSelectedTopic(null); // Hide topic details when viewing quiz
    setShowTopics(false);
  };

  const updateTopicIndex = async () => {
    try {
      if (completed > course?.file_data?.content?.length - 1) {
        return;
      }

      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/upload/updateindex`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            course_id: course.file_data.courseName,
          }),
        }
      );
      if (res.status === 200) {
        toast.success("Topic index updated successfully");

        // Find the current topic index
        let currentChapterIndex = selectedChapterIndex;
        let currentTopicIndex = course.file_data.content.chapters[currentChapterIndex].topics.findIndex(
          (topic) => topic.name === selectedTopic.name
        );

        // Move to the next topic in the same chapter if possible
        if (currentTopicIndex < course.file_data.content.chapters[currentChapterIndex].topics.length - 1) {
          setSelectedTopic(course.file_data.content.chapters[currentChapterIndex].topics[currentTopicIndex + 1]);
        }
        // Move to the first topic of the next chapter if available
        else if (currentChapterIndex < course.file_data.content.chapters.length - 1) {
          setSelectedChapterIndex(currentChapterIndex + 1);
          setSelectedTopic(course.file_data.content.chapters[currentChapterIndex + 1].topics[0]);
        }

        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: "smooth" });
        // Optional: Reloading will reset state, avoid if not necessary
        // window.location.reload();
      }
    } catch (error) {
      toast.error("Error updating topic index");
    }
  };

  const NextQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setSelectedAnswer(null); // Reset selected answer
    setIsAnswered(false); // Reset answer state
  };

  const checkCompletion = async () => {
    try {
      updateTopicIndex();
      if (course?.file_data?.content?.length === completed) {
        toast.success("Course completed successfully!");
      }
      setShowQuiz(false);
    } catch (error) { }
  };

  const ShowTopic = (topic, index) => {
    {
      console.log(course);
      if (completed >= index + 1) {
        handleTopicClick(topic);
      } else {
        toast.error("Please complete the previous topic first.");
      }
    }
  };

  const ShowQuiz = () => {
    {
      if (completed === 5) {
        handleQuizClick();
      } else {
        toast.error("Please complete the previous topic first to Take Quiz.");
      }
    }
  };

  const handleShowCertificate = () => {
    if (completed >= course?.file_data?.content?.length) {
      setShow(true);
    } else {
      toast.error("Please complete all the Modules first.");
    }
  };

  return (
    <>
      <Header />
      <main>
        <div className="w-full min-h-screen text-white lg:flex justify-center lg:mt-16">
          <div className="w-[20%] h-screen lg:mt-6 hidden lg:block overflow-auto">
            {loading ? (
              <div className="w-full max-w-md mx-auto animate-pulse">
                {[...Array(1)].map((_, index) => (
                  <div key={index} className="border-b py-4">
                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                ))}
                <div className="border-b flex min-h-[50px] items-center pl-16 w-full">
                  <span className="flex justify-between gap-2 w-full pr-4 cursor-pointer">
                    <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-6 bg-gray-300 rounded w-6"></div>
                  </span>
                </div>
              </div>) : (
              <Accordian
                data={course?.file_data}
                onTopicClick={handleTopicClick}
                onQuizClick={handleQuizClick}
                handleChapterClick={handleChapterClick}
                setShow={setShow}
                completed={completed}
                setCompleted={setCompleted}
              />)}
          </div>
          <button
            class="hero-subtitle-gradient hover:hero-subtitle-hover relative  font-medium text-sm inline-flex items-center gap-2 py-2 px-4.5 rounded-full lg:hidden mt-24 ml-6"
            onClick={toggleSidebar}
          >
            {/* <img src="/images/icon-title.svg" alt="icon" /> */}

            <span class="hero-subtitle-text">Show Topics</span>
          </button>
          <div className="lg:w-[55%] min-h-screen lg:border lg:border-gray-700 rounded-md lg:m-6 lg:ml-2 lg:mt-6 overflow-auto">
            {/* Show Topic Details */}
            {selectedTopic && !showQuiz && (
              <div className="p-8">
                <h3 className="text-3xl font-semibold mb-4">
                  {selectedTopic.name}
                </h3>
                {selectedTopic.details.map((detail, index) => (
                  <div key={index}>
                    {detail.startsWith("#include") ||
                      detail.startsWith("```") ? (
                      <>
                        <pre className="bg-gray-100 text-black p-2 rounded text-sm">
                          <code>{detail.replace(/```/g, "")}</code>
                        </pre>
                        <br />
                      </>
                    ) : (
                      <>
                        <p className="text-justify">{detail}</p>
                        <br />
                      </>
                    )}
                  </div>
                ))}
                <div className="w-full flex justify-end">
                  <button
                    class="hero-button-gradient inline-flex rounded-lg py-3 px-7 text-white font-medium ease-in duration-300 hover:opacity-80"
                    onClick={updateTopicIndex}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Show Quiz Interface */}
            {showQuiz && selectedChapterIndex !== null && (
              <>
                <Quiz quiz={course.file_data?.content?.chapters[selectedChapterIndex]
                  ?.quiz} />
              </>
            )}
          </div>
        </div>
      </main>
      <Sidebar
        showTopics={showTopics}
        toggleSidebar={toggleSidebar}
        handleChapterClick={handleChapterClick}
        selectedChapterIndex={selectedChapterIndex}
        course={course}
        ShowTopic={ShowTopic}
        completed={completed}
        ShowQuiz={handleQuizClick}
        handleShowCertificate={handleShowCertificate}
      />
      {show && (
        <ShowCertificate
          name={email}
          course={course?.file_data.courseName}
          setShow={setShow}
        />
      )}
      <Footer />
    </>
  );
};

export default CourseDetails;
