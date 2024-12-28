import mongoose from "mongoose";
import { handleMongoosePostSaveErrors } from "../middlewares/handleMongoosePostSaveErrors.js"

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 20,
        required: true,
    },
    lastName: {
        type: String,
        maxLength: 20,
        required: true,
    },
    email: {
        type: String,
        minLength: 5,
        maxLength: 60,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minLength: 8,
        maxLength: 255,
        hide: true,
        required: true
    },
},  { timestamps: true })

usersSchema.index({ email: 1 }, { unique: true })

usersSchema.post('save', handleMongoosePostSaveErrors)

export const userMongoDbModel = mongoose.model('users', usersSchema)