import { Router } from "express";

import { getCourse, createCourse,updateCourse,deleteCourseById } from "../controllers/course.controller.js";
import { isAdmin, verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/getcourse").get(getCourse);
router.route("/createcourse").post(verifyJWT,isAdmin,createCourse);
router.route("/updatecourse").patch(verifyJWT,isAdmin, updateCourse);
router.route("/deletecourse").delete(verifyJWT,isAdmin,deleteCourseById);


export default router;
