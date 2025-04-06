import React, { useState, useEffect } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

const AllCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // success | error | warning | info
  });


  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
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


  const handleOpenDialog = (fileName) => {
    setSelectedFile(fileName);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedFile(null);
  };

  const handleDeleteConfirmed = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/upload/deletefile`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fileName: selectedFile }),
        }
      );

      const result = await res.json();

      if (res.ok) {
        setCourses((prev) =>
          prev.filter((course) => course.file_name !== selectedFile)
        );
        showSnackbar(result.message || "Deleted successfully", "success");
      } else {
        showSnackbar(result.message || "Failed to delete", "error");
      }
    } catch (error) {
      console.error("Error deleting course file:", error);
      showSnackbar("Something went wrong!", "error");
    } finally {
      handleCloseDialog();
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };


  
  return (
    <section className="min-w-[350px] min-h-[40vh] bg-black/30 backdrop-blur-md p-4 text-white rounded-lg">
      <span className="text-lg font-semibold">All Courses</span>

      <div className="w-full min-h-fit mt-4 flex flex-col gap-3">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="w-full min-h-[50px] rounded-md border border-gray-800 flex justify-between items-center px-4 py-2 bg-black/20 backdrop-blur-md animate-pulse">
              <div className="w-1/3 h-4 bg-gray-700 rounded"></div>
              <div className="flex gap-2">
                <div className="w-6 h-6 bg-gray-700 rounded"></div>
              </div>
            </div>
          ))
        ) : (
          courses.map((course, index) => (
            <div key={index} className="w-full min-h-[50px] rounded-md border border-gray-800 flex justify-between items-center px-4 py-2 bg-black/20 backdrop-blur-md">
              <span>{course.file_data.courseName}</span>
              <div className="flex gap-2">
                <IconButton
                  color="error"
                  onClick={() => handleOpenDialog(course.file_name)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          ))
        )}
      </div>

       {/* Delete Confirmation Dialog */}
       <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete Course File</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete <strong>{selectedFile}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmed} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

       {/* Snackbar */}
       <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </section>
  );
};

export default AllCourse;
