import express from "express";
import { uploadFile,getfile,addcourse,getcourse,sendemail,updateIndex,getusercourse, deleteCourseFile } from "../controllers/uploadController.js";
import multer from "multer";
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/uploadfile",upload.single("file"), uploadFile);

router.get("/getfile",getfile);

router.post("/addcourse",addcourse);

router.post("/getcourse",getcourse);

router.get("/getusercourse",getusercourse);

router.post("/sendemail",sendemail);

router.post("/updateindex",updateIndex);

router.delete("/deletefile",deleteCourseFile);

export default router;