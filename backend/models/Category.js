import { NotFoundError } from '../controllers/errors.js'
import { categoriesMongoDbModel } from '../mongodb_schemas/categories.js'

export class Category {
    async create({ userId, input }) {
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
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async read({ userId }) {
        try {
            const categories = await categoriesMongoDbModel.find({ userId: userId, status: true }, { userId: 0, status: 0 })
            return categories
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async readById({ userId, id }) {
        try {
            const categoryFound = await categoriesMongoDbModel.findOne({ userId: userId, _id: id, status: true }, { userId: 0, status: 0 })
            return categoryFound
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async update({ userId, id, input }) {
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
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async delete({ userId, id }) {
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
        } catch (error) {
            throw new Error(error.message)
        }
    }
}