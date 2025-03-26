import React from "react";
import { Drawer, List, ListItem, ListItemText, Divider } from "@mui/material";
import HttpsIcon from "@mui/icons-material/Https";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const Sidebar = ({
  showTopics,
  handleChapterClick,
  selectedChapterIndex,
  course,
  ShowTopic,
  completed,
  ShowQuiz,
  handleShowCertificate,
  toggleSidebar,
}) => {
  return (
    <Drawer
      anchor="left"
      open={showTopics}
      onClose={toggleSidebar} // Close when clicking outside
      sx={{
        "& .MuiDrawer-paper": {
          width: "300px",
          backgroundColor: "#1b1c1e", // Match your UI color
          color: "white",
        },
      }}
    >
      <List>
        {course?.file_data?.content?.chapters.map((chapter, chapterIndex) => (
          <React.Fragment key={chapterIndex}>
            {/* Chapter Header */}
            <ListItem
              button
              onClick={() => handleChapterClick(chapterIndex)}
              sx={{
                backgroundColor: selectedChapterIndex === chapterIndex ? "#374151" : "transparent",
                "&:hover": { backgroundColor: "#4b5563" },
              }}
            >
              <ListItemText primary={`Chapter ${chapterIndex + 1}: ${chapter.chapterName}`} />
            </ListItem>
            
            {/* Topics */}
            {selectedChapterIndex === chapterIndex &&
              chapter.topics.map((topic, topicIndex) => (
                <ListItem
                  button
                  key={topicIndex}
                  sx={{ pl: 4, "&:hover": { backgroundColor: "#4b5563" } }}
                  onClick={() => {
                    ShowTopic(topic, topic.index);
                    toggleSidebar(); // Close sidebar after clicking topic
                  }}
                >
                  <ListItemText primary={topic.name} />
                  {completed <= topic.index ? (
                    <HttpsIcon className="text-red-600" />
                  ) : (
                    <DoneAllIcon className="text-green-500" />
                  )}
                </ListItem>
              ))}

            {/* Take Quiz */}
            {selectedChapterIndex === chapterIndex && (
              <ListItem button sx={{ pl: 4 }} onClick={() => {
                ShowQuiz();
                toggleSidebar(); 
                }}>
                <ListItemText primary="Take Quiz" />
              </ListItem>
            )}

            <Divider sx={{ backgroundColor: "#4b5563" }} />
          </React.Fragment>
        ))}

        {/* Certificate */}
        <ListItem button sx={{ pl: 4 }} onClick={handleShowCertificate}>
          <ListItemText primary="Your Certificate" />
          {completed >= course?.file_data?.content?.length ? (
            <DoneAllIcon className="text-green-500" />
          ) : (
            <HttpsIcon className="text-red-600" />
          )}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
