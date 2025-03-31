import React, { useState, useEffect } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import QuizIcon from "@mui/icons-material/Quiz";
import HttpsIcon from "@mui/icons-material/Https";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { toast, ToastContainer } from "react-toastify";

const AccordionItem = ({
  title,
  courseName,
  topics,
  isOpen,
  onClick,
  onTopicClick,
  activeTopicIndex,
  onQuizClick,
  setCompleted,
  defaultOpen
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultOpen || false); 
  const [token, setToken] = useState(null);
  const [usercourses, setUserCourses] = useState([]);
  const [email, setEmail] = useState("");
  const [topicCompleted, setTopicCompleted] = useState(0);// Open first chapter by default

  useEffect(() => {
    if (defaultOpen) {
      setIsExpanded(true);
    }
  }, [defaultOpen]);

  useEffect(() => {
    const storedUser = localStorage.getItem("firebaseUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (usercourses.length === 0) {
        getStatus(parsedUser.email);
      }
      setToken(parsedUser);
      setEmail(parsedUser.email);
      setTopicCompleted(
        usercourses.find((c) => c.course_id === courseName)?.completed
      );
      console.log("Topic completed:", topicCompleted);

      setCompleted(topicCompleted);
    }
  }, [usercourses]);

  const getStatus = async (userEmail) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/upload/getcourse`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userEmail }),
        }
      );

      const statusData = await res.json();
      setUserCourses(statusData);
      console.log("User course status:", statusData);
    } catch (error) {
      console.error("Error fetching course status:", error);
    }
  };

  const ShowTopic = (topic, index) => {
    {
      console.log(usercourses);
      if (topicCompleted >= index + 1) {
        onTopicClick(topic, index);
      } else {
        toast.error("Please complete the previous topic first.");
      }
    }
  };

  const ShowQuiz = () => {
    {
      console.log(topicCompleted,topics.length);
      if (topicCompleted >= topics.length) {
        onQuizClick();
      } else {
        toast.error("Please complete the previous topic first to Take Quiz.");
      }
    }
  };

  return (
    <div className="border-b flex flex-col items-end">
    <button
      className="flex gap-3 w-full p-4 text-left transition duration-300"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <span
        className={`transform transition-transform duration-300 ${
          isOpen ? "rotate-90" : "rotate-0"
        }`}
      >
        <ArrowForwardIosIcon />
      </span>
      <span>{title}</span>
    </button>

      {isExpanded && (
        <div className="">
          {topics.map((topic, index) => (
            <div
              key={index}
              className={`mb-2 cursor-pointer p-2 rounded ${
                activeTopicIndex === index ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => ShowTopic(topic, topic.index)} // Pass index to onTopicClick
             >
              <span className="flex justify-between gap-2">
                <h3 className="font-semibold">{topic.name}</h3>
                {topicCompleted <= topic.index? (
                  <HttpsIcon className="text-red-600" />
                ) : (
                  <DoneAllIcon className="text-green-500" />
                )}
              </span>
            </div>
          ))}
            <div
            className={`mb-2 cursor-pointer p-2 rounded`}
            onClick={ShowQuiz} // Call onQuizClick
          >
            <span className="flex justify-between gap-2">
              <h3 className="font-semibold">
                Take Quiz&nbsp;&nbsp;
              </h3>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

const Accordian = ({
  data,
  onTopicClick,
  onQuizClick,
  handleChapterClick,
  setShow,
  completed,
  setCompleted
}) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeTopicIndex, setActiveTopicIndex] = useState(null); // Track active topic index

  const handleItemClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
    handleChapterClick(index); // Call parent handler
    setActiveTopicIndex(null); // Reset active topic when changing chapters
  };

  const handleTopicClick = (topic, index) => {
    onTopicClick(topic); // Call parent handler
    setActiveTopicIndex(index); // Set active topic index
  };

  const handleShowCertificate = () => {
    console.log(completed,data?.content?.length);
    
    if ( completed >= data?.content?.length) {
      setShow(true);
    } else {
      toast.error("Please complete all the Modules first.");
    }
  };
  return (
    <>
      <div className="w-full max-w-md mx-auto">
        {data?.content?.chapters.map((item, index) => (
          <AccordionItem
            key={index}
            setCompleted={setCompleted}
            courseName={data.courseName}
            title={item.chapterName}
            topics={item.topics}
            isOpen={activeIndex === index}
            onClick={() => handleItemClick(index)}
            onTopicClick={handleTopicClick}
            onQuizClick={onQuizClick}
            activeTopicIndex={activeTopicIndex} // Pass down active topic index
          />
        ))}
        <div className="border-b flex min-h-[50px] items-center pl-16 w-full">
          <span
            className="flex justify-between gap-2 w-full pr-4 cursor-pointer"
            onClick={handleShowCertificate}
          >
            <h3 className="font-semibold">Your Certificate</h3>
            {completed >= data?.content?.length ? (
              <DoneAllIcon className="text-green-500" />
            ) : (
              <HttpsIcon className="text-red-600" />
            )}
          </span>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Accordian;
