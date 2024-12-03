import mongoose from "mongoose";
import { handleMongoosePostSaveErrors } from "../middlewares/handleMongoosePostSaveErrors.js"

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        hide: true,
        required: true
    },
},  { timestamps: true })

usersSchema.post('save', handleMongoosePostSaveErrors)

export const userMongoDbModel = mongoose.model('users', usersSchema)