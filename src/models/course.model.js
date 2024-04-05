import mongoose, { Schema } from 'mongoose'

const courseSchema = new Schema(
    {
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    popularity: {
        type: String,
        required: true
    }
});


export const Course = mongoose.model('Course', courseSchema);

