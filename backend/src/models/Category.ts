import { NotFoundError } from '../controllers/errors'
import { iCategoriesInput, iCategoriesOutput } from '../interfaces/categories'
import { categoriesMongoDbModel } from '../schemas/mongodb/categories'
import { ModelBase } from './ModelBase'

export class Category extends ModelBase<iCategoriesInput, iCategoriesOutput> {

    async create(input: iCategoriesInput): Promise<Partial<iCategoriesOutput>> {
        const {
            name,
            description,
            color,
            userId
        }: iCategoriesInput = input

        const newCategory = {
            name,
            description,
            color,
            userId
        }

        try {
            const createdCategory: Partial<iCategoriesOutput> = await categoriesMongoDbModel.create(newCategory)
            return createdCategory
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async read(userId: string): Promise<Partial<iCategoriesOutput[]>> {
        try {
            const categories: Partial<iCategoriesOutput[]> = await categoriesMongoDbModel.find({ userId: userId, status: true }, { userId: 0, status: 0 })
            return categories
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async readById(id: string): Promise<Partial<iCategoriesOutput | null>> {
        try {
            const categoryFound: Partial<iCategoriesOutput | null> = await categoriesMongoDbModel.findOne(
                { _id: id, status: true },
                { userId: 0, status: 0 }
            )
            return categoryFound
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async update(id: string, input: Partial<iCategoriesInput>): Promise<Partial<iCategoriesOutput | null>> {
        const {
            name,
            description,
            color
        }: Partial<iCategoriesInput> = input

        try {
            const updatedCategory: Partial<iCategoriesOutput | null> = await categoriesMongoDbModel.findOneAndUpdate(
                { _id: id, status: true },
                {
                    name, description, color
                },
                {
                    new: true,
                    projection: {
                        userId: 0
                    }
                })

            if (!updatedCategory) {
                throw new NotFoundError("Category doesn't exists or has been deleted")
            }

            return updatedCategory
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async delete(id: string): Promise<Partial<iCategoriesOutput | null>> {
        try {
            const deletedCategory: Partial<iCategoriesOutput | null> = await categoriesMongoDbModel.findOneAndUpdate(
                { _id: id, status: true },
                {
                    status: false
                },
                {
                    new: true,
                    projection: {
                        userId: 0
                    }
                }
            )

            if (!deletedCategory) {
                throw new NotFoundError("Category doesn't exists or has already been deleted")
            }

            return deletedCategory
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}