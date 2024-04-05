import { Enrollment } from "../models/courseEnrollment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const enrollCourse = asyncHandler(async(req,res)=>{
    const userId = req.user.id;
    const { courseId } = req.body

    const existingEnrollment = await Enrollment.findOne({ userId, courseId });
    if (existingEnrollment) {
        throw new ApiError(400,'Course is already Enrolled')
    }
    const newEnrollment = await Enrollment.create({ userId, courseId });
    // await newEnrollment.save();

    return res.status(201).json(new ApiResponse(200, newEnrollment,'Enroll Successfull'))
});

const viewEnrollCourse = asyncHandler(async(req,res)=>{
    const userId = req.user.id;
    const userEnrollments = await Enrollment.find({ userId }).populate('courseId');
    if(!userEnrollments){
        throw new ApiError(400, 'Somthing wrong in enrollments')
    }
    return res.status(201).json(new ApiResponse(200, userEnrollments, 'View Enroll Course'))

 })

export{
    enrollCourse,viewEnrollCourse
}