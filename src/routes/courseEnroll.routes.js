import { Router } from "express";
import { enrollCourse, viewEnrollCourse } from "../controllers/courseEnroll.controller.js";
import { isAdmin, verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/getcourse").get(verifyJWT,enrollCourse);
router.route("/createcourse").post(verifyJWT,viewEnrollCourse);



export default router;
