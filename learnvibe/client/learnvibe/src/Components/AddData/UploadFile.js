import React, { useState } from "react";
import { Button, Snackbar, Alert, Typography, Box } from "@mui/material";

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setSnackbarMessage("Please select a JSON file first!");
      setSnackbarSeverity("warning");
      setOpenSnackbar(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/upload/uploadfile`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      setSnackbarMessage("File uploaded successfully!");
      setSnackbarSeverity("success");
    } catch (error) {
      setSnackbarMessage("File upload failed!");
      setSnackbarSeverity("error");
    }

    setOpenSnackbar(true);
  };

  return (
    <>
    <Box
      sx={{
        width: 300,
        minHeight: "40vh",
        bgcolor: "rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(8px)",
        p: 3,
        borderRadius: 2,
        color: "white",
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        Add Courses
      </Typography>

      <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
        <input type="file" accept=".json" onChange={handleFileSelect} style={{ color: "white" }} />
        
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
          {/* Snackbar for notifications */}
          <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      </>
  );
};

export default UploadFile;
