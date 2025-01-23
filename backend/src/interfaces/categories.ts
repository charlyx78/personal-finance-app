import { Schema } from "mongoose"

export interface iCategories {
    _id: Schema.Types.ObjectId,
    name: string,
    description?: string,
    color: string,
    userId: Schema.Types.ObjectId,
    status?: boolean,
    createdAt: Date,
    updatedAt: Date
}

export interface iCategoriesInput {
    name: string,
    description?: string,
    color: string,
    userId: string
}

export interface iCategoriesOutput {
    _id?: Schema.Types.ObjectId,
    name?: string,
    description?: string,
    color?: string,
}