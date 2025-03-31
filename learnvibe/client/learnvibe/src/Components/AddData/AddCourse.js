import { useState } from "react";

const CourseForm = ({ course, setCourse }) => {
    return (
        <div className="mt-5">
            <label className="text-white block font-medium">Course Name</label>
            <input type="text" placeholder="Enter Course Name" 
                class="rounded-lg border border-white/[0.12] bg-white/[0.05] focus:border-purple w-full py-3 px-6 outline-none mt-3"
                value={course.name} 
                onChange={(e) => setCourse({ ...course, name: e.target.value })} />

            <label className="text-white block font-medium mt-3">Image Link</label>
            <input type="text" placeholder="Enter Image Link" 
                class="rounded-lg border border-white/[0.12] bg-white/[0.05] focus:border-purple w-full py-3 px-6 outline-none mt-3"
                value={course.image} 
                onChange={(e) => setCourse({ ...course, image: e.target.value })} />
        </div>
    );
};

const ParagraphInput = ({ paragraphs, setParagraphs }) => {
    const addParagraph = () => setParagraphs([...paragraphs, ""]);
    const updateParagraph = (index, value) => {
        const updated = [...paragraphs];
        updated[index] = value;
        setParagraphs(updated);
    };
    return (
        <div>
            {paragraphs.map((para, index) => (
                <textarea key={index} class="rounded-lg border border-white/[0.12] bg-white/[0.05] focus:border-purple w-full py-3 px-6 outline-none mt-3" placeholder="Enter Paragraph" 
                    value={para} onChange={(e) => updateParagraph(index, e.target.value)} />
            ))}
            <button onClick={addParagraph}  className="mt-6 w-fit bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg"
                >Add Paragraph</button>
        </div>
    );
};

const QuizForm = ({ quiz, setQuiz }) => {
    const addQuestion = () => setQuiz([...quiz, { question: "", options: ["", "", "", ""], answer: "" }]);
    const updateQuestion = (index, field, value) => {
        const updated = [...quiz];
        updated[index][field] = value;
        setQuiz(updated);
    };
    return (
        <div>
            {quiz.map((q, index) => (
                <div key={index} className="mt-3">
                    <input type="text" class="rounded-lg border border-white/[0.12] bg-white/[0.05] focus:border-purple w-full py-3 px-6 outline-none mt-3" placeholder="Enter Question" 
                        value={q.question} 
                        onChange={(e) => updateQuestion(index, "question", e.target.value)} />
                    {q.options.map((opt, optIndex) => (
                        <input key={optIndex} type="text" class="rounded-lg border border-white/[0.12] bg-white/[0.05] focus:border-purple w-full py-3 px-6 outline-none mt-3" placeholder={`Option ${optIndex + 1}`} 
                            value={opt} 
                            onChange={(e) => {
                                const updated = [...q.options];
                                updated[optIndex] = e.target.value;
                                updateQuestion(index, "options", updated);
                            }} />
                    ))}
                    <input type="text" class="rounded-lg border border-white/[0.12] bg-white/[0.05] focus:border-purple w-full py-3 px-6 outline-none mt-3" placeholder="Enter Answer" 
                        value={q.answer} 
                        onChange={(e) => updateQuestion(index, "answer", e.target.value)} />
                </div>
            ))}
            <button onClick={addQuestion}   className="mt-6 w-fit bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg"
                >Add Question</button>
        </div>
    );
};

const TopicForm = ({ topics, setTopics }) => {
    const addTopic = () => setTopics([...topics, { name: "", subtopic: "", paragraphs: [""], quiz: [] }]);
    const updateTopic = (index, field, value) => {
        const updated = [...topics];
        updated[index][field] = value;
        setTopics(updated);
    };
    return (
        <div>
            {topics.map((topic, index) => (
                <div key={index} className="mt-5">
                    <input type="text" class="rounded-lg border border-white/[0.12] bg-white/[0.05] focus:border-purple w-full py-3 px-6 outline-none mt-3" placeholder="Enter Topic Name" 
                        value={topic.name} 
                        onChange={(e) => updateTopic(index, "name", e.target.value)} />
                    <input type="text" class="rounded-lg border border-white/[0.12] bg-white/[0.05] focus:border-purple w-full py-3 px-6 outline-none mt-3" placeholder="Enter Subtopic Name" 
                        value={topic.subtopic} 
                        onChange={(e) => updateTopic(index, "subtopic", e.target.value)} />
                    <ParagraphInput paragraphs={topic.paragraphs} setParagraphs={(value) => {
                        const updated = [...topics];
                        updated[index].paragraphs = value;
                        setTopics(updated);
                    }} />
                    <QuizForm quiz={topic.quiz} setQuiz={(value) => {
                        const updated = [...topics];
                        updated[index].quiz = value;
                        setTopics(updated);
                    }} />
                </div>
            ))}
            <button onClick={addTopic}   className="mt-6 w-fit bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg"
                >Add Topic</button>
        </div>
    );
};

const AddCourse = () => {
    const [course, setCourse] = useState({ name: "", image: "" });
    const [topics, setTopics] = useState([]);

    const handleSubmit = async () => {
        const courseData = {
            name: course.name,
            image: course.image,
            topics: topics,
        };
    
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/upload/addcourse`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(courseData),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                console.log("Course successfully added:", result);
                // Handle success (you can clear the form, show a success message, etc.)
            } else {
                console.error("Error adding course:", result.message);
                // Handle error (you can show an error message to the user)
            }
        } catch (error) {
            console.error("Network error:", error);
            // Handle network error (you can show a general error message to the user)
        }
    };
    
    return (
        <section className="min-w-[350px] lg:w-[800px] h-full bg-black/30 backdrop-blur-md p-8 text-white rounded-lg">
            <h2 className="text-lg font-semibold">Add Course</h2>
            <CourseForm course={course} setCourse={setCourse} />
            <h3 className="text-md font-semibold mt-5">Add Topics</h3>
            <TopicForm topics={topics} setTopics={setTopics} />

            <button
                className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </section>
    );
};

export default AddCourse;