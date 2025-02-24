import express from "express";
import { uploadFile,getfile,addcourse,getcourse,sendemail,updateIndex } from "../controllers/uploadController.js";
import multer from "multer";
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/uploadfile",upload.single("file"), uploadFile);

router.get("/getfile",getfile);

router.post("/addcourse",addcourse);

router.post("/getcourse",getcourse);

router.post("/sendemail",sendemail);

router.post("/updateindex",updateIndex);

export default router;