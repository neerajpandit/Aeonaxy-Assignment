import { Course } from "../models/course.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// const getCourse = asyncHandler(async(req,res)=>{
//     const courses = await Course.find();
//     if(!courses){
//         throw new ApiError(400, 'Cource not found')
//     }
//     return res.status(201).json(new ApiResponse(200, courses,'Cource Fetch Succefully'))
// });

const getCourse = asyncHandler(async(req, res) => {
    const { page = 1, limit = 10, category, level, popularity } = req.query;
    const query = {};

    if (category) {
        query.category = category;
    }
    if (level) {
        query.level = level;
    }
    if (popularity) {
        query.popularity = popularity;
    }

    try {
        const totalCount = await Course.countDocuments(query);

        const startIndex = (page - 1) * limit;

        const endIndex = page * limit;

        const courses = await Course.find(query).limit(limit).skip(startIndex).exec();

        const pagination = {};

        if (endIndex < totalCount) {
            pagination.next = {
                page: parseInt(page) + 1,
                limit: parseInt(limit)
            };
        }

        if (startIndex > 0) {
            pagination.prev = {
                page: parseInt(page) - 1,
                limit: parseInt(limit)
            };
        }

        
        res.status(200).json(new ApiResponse(200, { totalCount, courses, pagination }, 'Courses fetched successfully'));
    } catch (err) {
        
        res.status(400).json(new ApiError(400, err.message));
    }
});

const createCourse = asyncHandler(async(req,res)=>{
    const { title, category, level, popularity } = req.body
    if (
        [title, category, level, popularity].some(
          (field) => field?.trim() === ""
        )
      ) {
        throw new ApiError(400, "All fields are required");
      }
    
    const course = await Course.create({
        title,
        category,
        level,
        popularity
    })
    if (!course) {
        throw new ApiError(500, "Something went wrong while create course");
      }
    
      return res
        .status(201)
        .json(new ApiResponse(200, cource, "Course Create Successfully"));
});

const updateCourse = asyncHandler(async(req,res)=>{
    const { title, category, level, popularity } = req.body
    if (!title && !category && !level && !popularity) {
        throw new ApiError(400, "fields are required");
      }
    const course = await Course.findByIdAndUpdate(
        {_id:req.params.id},
        {
          $set: {
            title: title,
            category: category,
            level: level,
            popularity: popularity,
           
          },
        },
        { new: true }
      )
    
      return res
        .status(200)
        .json(new ApiResponse(200, course, "Account details updated successfully"));
});

const deleteCourseById = asyncHandler(async(req,res)=>{
    const courseId = req.params.id
    const course = await Course.findById(courseId)
    
    if(!course){
      throw new ApiError(400,"Somithing Wrong Delete course")
    }
    await course.deleteOne()
    return res.status(200).json(new ApiResponse(200,course,"Course Delete Succesfully"))
  })


export {
    getCourse,createCourse,updateCourse,deleteCourseById
}