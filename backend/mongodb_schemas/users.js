import mongoose from "mongoose";
import { handleMongoosePostSaveErrors } from "../middlewares/handleMongoosePostSaveErrors.js"

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 20,
        required: true,
    },
    lastName: {
        type: String,
        maxlength: 20,
        required: true,
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 60,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 255,
        hide: true,
        required: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    }
}, { timestamps: true })

usersSchema.index({ email: 1 }, { unique: true })

usersSchema.post('save', handleMongoosePostSaveErrors)

export const userMongoDbModel = mongoose.model('users', usersSchema)