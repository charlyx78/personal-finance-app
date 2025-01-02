import mongoose from "mongoose";
import { handleMongoosePostSaveErrors } from "../middlewares/handleMongoosePostSaveErrors.js";

export const categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 20,
        required: true
    },
    description: {
        type: String,
        maxlength: 255
    },
    color: {
        type: String,
        minlength: 7,
        maxlength: 7,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    }
}, { timestamps: true })

categoriesSchema.index({ name: 1, userId: 1 }, { unique: true })

categoriesSchema.post('save', handleMongoosePostSaveErrors)

export const categoriesMongoDbModel = mongoose.model('categories', categoriesSchema)