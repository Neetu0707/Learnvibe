import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Accordian from "./Accordian";
import ShowCertificate from "./ShowCertificate";
import QuizIcon from "@mui/icons-material/Quiz";
import { toast, ToastContainer } from "react-toastify";
import HttpsIcon from "@mui/icons-material/Https";
import DoneAllIcon from "@mui/icons-material/DoneAll";

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
  const [course_id, setCourse_id] = useState("");
  const [completed, setCompleted] = useState(0);

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
        window.location.reload();
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
    } catch (error) {}
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
            <Accordian
              data={course?.file_data}
              onTopicClick={handleTopicClick}
              onQuizClick={handleQuizClick}
              handleChapterClick={handleChapterClick}
              setShow={setShow}
              completed={completed}
              setCompleted={setCompleted}
            />
          </div>
          <button
            class="hero-subtitle-gradient hover:hero-subtitle-hover relative  font-medium text-sm inline-flex items-center gap-2 py-2 px-4.5 rounded-full lg:hidden mt-24 ml-6"
            onClick={() => setShowTopics(true)}
          >
            {/* <img src="/images/icon-title.svg" alt="icon" /> */}

            <span class="hero-subtitle-text">Show Topics</span>
          </button>
          <div className="lg:w-[55%] min-h-screen border border-gray-700 rounded-md m-6 lg:ml-2 lg:mt-6 overflow-auto">
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
                    className="bg-gray-700 text-white px-4 py-2 rounded"
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
                <div className="p-8 ">
                  <h3 className="text-2xl font-semibold mb-4">
                    Quiz for Chapter {selectedChapterIndex + 1}
                  </h3>

                  {course.file_data?.content?.chapters[selectedChapterIndex]
                    ?.quiz?.questions.length > 0 && (
                    <>
                      <p className="font-semibold mb-2">
                        {currentQuestionIndex + 1}.{" "}
                        {
                          course.file_data?.content?.chapters[
                            selectedChapterIndex
                          ].quiz.questions[currentQuestionIndex].question
                        }
                      </p>

                      <div className="pl-4">
                        {course.file_data?.content?.chapters[
                          selectedChapterIndex
                        ].quiz.questions[currentQuestionIndex].options.map(
                          (option, optionIndex) => (
                            <div key={optionIndex} className="mb-2">
                              <label>
                                <input
                                  type="radio"
                                  name={`question-${currentQuestionIndex}`}
                                  className="mr-2"
                                  onChange={() => {
                                    setSelectedAnswer(option);
                                    setIsAnswered(false); // Reset answered state when selecting a new option
                                  }}
                                />
                                {option}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    </>
                  )}
                </div>
                {isAnswered && (
                  <div className=" px-6">
                    {selectedAnswer ===
                    course.file_data?.content?.chapters[selectedChapterIndex]
                      .quiz.questions[currentQuestionIndex].answer ? (
                      <p className="text-green-500">Correct!</p>
                    ) : (
                      <p className="text-red-500">
                        Incorrect! The correct answer is:{" "}
                        <strong>
                          {
                            course.file_data.content?.chapters[
                              selectedChapterIndex
                            ].quiz.questions[currentQuestionIndex].answer
                          }
                        </strong>
                      </p>
                    )}
                  </div>
                )}

                <div className="flex justify-between  mt-4 px-6">
                  <button
                    className="bg-gray-700 text-white px-4 py-2 rounded"
                    onClick={() => {
                      setIsAnswered(true); // Mark as answered
                    }}
                  >
                    Submit Answer
                  </button>
                  {currentQuestionIndex <
                  course.file_data?.content?.chapters[selectedChapterIndex].quiz
                    .questions.length -
                    1 ? (
                    <button
                      className="bg-gray-700 text-white px-4 py-2 rounded"
                      onClick={() => {
                        NextQuestion(currentQuestionIndex + 1);
                      }}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => {
                        checkCompletion();
                      }}
                    >
                      Finish Quiz
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      {showTopics && (
        <div className="w-full lg:w-[25%] lg:max-w-[350px] min-h-screen lg:hidden fixed top-0 z-50 lg:p-6 lg:pr-2 md:p-4 p-6 bg-[#1b1c1e90] lg:bg-transparent">
          <div className="border border-gray-700 rounded-md">
            {course.file_data?.content?.chapters.map(
              (chapter, chapterIndex) => (
                <div key={chapterIndex}>
                  {/* Chapter Header */}
                  <div
                    className={`p-4 bg-gray-900 border-b border-gray-800 cursor-pointer ${
                      selectedChapterIndex === chapterIndex ? "bg-gray-700" : ""
                    }`}
                    onClick={() => handleChapterClick(chapterIndex)}
                  >
                    <h2 className="text-lg font-semibold">
                      Chapter {chapterIndex + 1}: {chapter.chapterName}
                    </h2>
                  </div>

                  {/* Topics and Quiz */}
                  {selectedChapterIndex === chapterIndex && (
                    <div className="bg-gray-700">
                      {chapter.topics.map((topic, topicIndex) => (
                        <div
                          key={topicIndex}
                          className="p-2 pl-6 cursor-pointer hover:bg-gray-900"
                          onClick={() => ShowTopic(topic, topic.index)}
                        >
                          <span className="flex justify-between gap-2">
                            <h3 className="font-semibold">{topic.name}</h3>
                            {completed <= topic.index ? (
                              <HttpsIcon className="text-red-600" />
                            ) : (
                              <DoneAllIcon className="text-green-500" />
                            )}
                          </span>
                        </div>
                      ))}
                      <div
                        className="p-2 pl-6 cursor-pointer hover:bg-gray-900"
                        onClick={ShowQuiz}
                      >
                        <span className="flex justify-between gap-2">
                          <h3 className="font-semibold">
                            Take Quiz&nbsp;&nbsp;
                            <QuizIcon />
                          </h3>
                          <HttpsIcon className="text-red-600" />
                        </span>
                      </div>
                      <div className="border-b flex min-h-[50px] items-center pl-7 pr-2 w-full">
                        <span
                          className="flex justify-between gap-2 w-full cursor-pointer"
                          onClick={handleShowCertificate}
                        >
                          <h3 className="font-semibold">Your Certificate</h3>
                          {completed >= course?.file_data?.content?.length ? (
                            <DoneAllIcon className="text-green-500" />
                          ) : (
                            <HttpsIcon className="text-red-600" />
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      )}

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
