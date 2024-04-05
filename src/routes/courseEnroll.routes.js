import { Router } from "express";
import { enrollCourse, viewEnrollCourse } from "../controllers/courseEnroll.controller.js";
import { isAdmin, verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/enrollcourse").post(verifyJWT,enrollCourse);
router.route("/viewcourse").get(verifyJWT,viewEnrollCourse);



export default router;
