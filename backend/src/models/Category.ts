import { NotFoundError } from '../controllers/errors'
import { categoriesMongoDbModel, iCategories } from '../schemas/mongodb/categories'
import { ModelBase } from './ModelBase'
import { Schema } from 'mongoose'

export class Category extends ModelBase<iCategories> {

    async create(userId: string, input: iCategories) {
        const {
            name,
            description,
            color
        } = input

        const newCategory = {
            name,
            description,
            color,
            userId: userId
        }

        try {
            const createdCategory = await categoriesMongoDbModel.create(newCategory)
            return createdCategory
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async read(userId: string) {
        try {
            const categories = await categoriesMongoDbModel.find({ userId: userId, status: true }, { userId: 0, status: 0 })
            return categories
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async readById(userId: string, id: string) {
        try {
            const categoryFound = await categoriesMongoDbModel.findOne({ userId: userId, _id: id, status: true }, { userId: 0, status: 0 })
            return categoryFound
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async update(userId: string, id: string, input: iCategories) {
        const {
            name,
            description,
            color
        } = input
        try {
            const updatedCategory = await categoriesMongoDbModel.findOneAndUpdate({ userId: userId, _id: id, status: true }, {
                name,
                description,
                color
            }, {
                new: true,
                projection: {
                    userId: 0
                }
            })

            if(!updatedCategory) {
                throw new NotFoundError("Category doesn't exists or has been deleted")
            }

            return updatedCategory
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async delete(userId: string, id: string) {
        try {
            const deletedCategory = await categoriesMongoDbModel.findOneAndUpdate({ userId: userId, _id: id, status: true }, {
                status: false
            }, {
                new: true,
                projection: {
                    userId: 0
                }
            })

            if(!deletedCategory) {
                throw new NotFoundError("Category doesn't exists or has already been deleted")
            }

            return deletedCategory
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}