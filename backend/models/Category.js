import { categoriesMongoDbModel } from '../mongodb_schemas/categories.js'

export class Category {
    async create({ input, userId }) {
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
}