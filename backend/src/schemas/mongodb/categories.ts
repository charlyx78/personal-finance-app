import { Model, Schema, model } from "mongoose";
import { handleMongoosePostSaveErrors } from "../middlewares/handleMongoosePostSaveErrors";

export interface iCategories {
    name: string,
    description?: string,
    color: string,
    userId: Schema.Types.ObjectId,
    status?: boolean
}

type CategoryModel = Model<iCategories>

export const categoriesSchema = new Schema<iCategories, CategoryModel>({
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
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    status: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true })

categoriesSchema.index({ name: 1, userId: 1 }, { unique: true, partialFilterExpression: { status: true } })

categoriesSchema.post('save', handleMongoosePostSaveErrors)

export const categoriesMongoDbModel = model<iCategories, CategoryModel>('categories', categoriesSchema)