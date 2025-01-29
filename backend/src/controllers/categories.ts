import { Schema } from "mongoose"
import { Category } from "../models/Category.js"
import { AuthController } from "./auth.js"
import { Request, Response } from "express"
import { iCategoriesInput } from "../interfaces/categories.js"
import { config } from "../config.js"
const category = new Category()

export class CategoriesController {
    create = async (req: Request, res: Response): Promise<void> => {
        const {
            name,
            description,
            color,
        }: iCategoriesInput = req.body

        const categoryData = {
            name,
            description,
            color,
            userId: req.user!._id
        }

        try {
            const newCategory = await category.create(categoryData)
            res.status(201).json({ message: "Category created successfully!", category: newCategory })
        } catch (error: any) {
            res.status(500).json({ error: config.NODE_ENV === "PROD" ? "An unexpected error ocurred. Please try again" : error.message })
        }
    }

    read = async (req: Request, res: Response): Promise<void> => {
        try {
            const categories = await category.read(req.user!._id)

            if (categories.length === 0) {
                res.status(404).json({ error: "Categories not found" })
                return
            }

            res.status(200).json({ message: "Categories found successfully!", categories: categories })
        } catch (error: any) {
            res.status(500).json({ error: config.NODE_ENV === "PROD" ? "An unexpected error ocurred. Please try again" : error.message })
        }
    }

    readById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        try {
            const categoryFound = await category.readById(req.params.id)

            if (!categoryFound) {
                res.status(404).json({ error: "Category not found" })
                return
            }

            res.status(200).json({ message: "Category found successfullysuccessfully!", categories: categoryFound })
        } catch (error: any) {
            res.status(500).json({ error: config.NODE_ENV === "PROD" ? "An unexpected error ocurred. Please try again" : error.message })
        }
    }

    update = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        const {
            name,
            description,
            color
        }: Partial<iCategoriesInput> = req.body

        const categoryData: Partial<iCategoriesInput> = {
            name,
            description,
            color
        }

        try {
            const updatedCategory = await category.update(req.params.id, categoryData)

            if (!updatedCategory) {
                res.status(404).json({ error: "Category doesn't exists or has been deleted" })
            }

            res.status(200).json({ message: "Category updated successfully!", category: updatedCategory })
        } catch (error: any) {
            res.status(500).json({ error: config.NODE_ENV === "PROD" ? "An unexpected error ocurred. Please try again" : error.message })
        }
    }

    delete = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        try {
            const deletedCategory = await category.delete(req.params.id)

            if (!deletedCategory) {
                res.status(404).json({ error: "Category doesn't exists or has already been deleted" })
                return
            }

            res.status(200).json({ message: "Category deleted successfully!", category: deletedCategory })
        } catch (error: any) {
            res.status(500).json({ error: config.NODE_ENV === "PROD" ? "An unexpected error ocurred. Please try again" : error.message })
        }
    }
}