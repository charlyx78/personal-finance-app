import { Schema } from "mongoose"
import { Category } from "../models/Category.js"
import { iCategories } from "../schemas/mongodb/categories.js"
import { AuthController } from "./auth.js"
import { Request, Response } from "express"

const category = new Category()

export class CategoriesController {
    create = async (req: Request, res: Response): Promise<Response> => {
        const {
            name,
            description,
            color
        } : iCategories = req.body 
        try {
            const newCategory = await category.create(req.user!.id, req.body)
            return res.status(201).json({ message: "Category created successfully!", category: newCategory })
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
        }
    }

    read = async (req: Request, res: Response): Promise<Response> => {
        try {
            const categories = await category.read(req.user!.id)

            if (categories.length === 0) {
                return res.status(404).json({ error: "Categories not found" })
            }

            return res.status(200).json({ message: "Categories found", categories: categories })
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
        }
    }

    readById = async (req: Request<{id: string}>, res: Response): Promise<Response> => {
        try {
            const categoryFound = await category.readById(req.user!.id, req.params.id)

            if (!categoryFound) {
                return res.status(404).json({ error: "Category not found" })
            }

            return res.status(200).json({ message: "Category found", categories: categoryFound })
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
        }
    }

    update = async (req: Request<{id: string}>, res: Response): Promise<Response> => {
        const {
            name,
            description,
            color
        } : iCategories = req.body 

        try {
            const updatedCategory = await category.update(req.user!.id, req.params.id, req.body)

            if (!updatedCategory) {
                return res.status(404).json({ error: "Category doesn't exists or has been deleted" })
            }

            return res.status(200).json({ message: "Category updated", category: updatedCategory })
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
        }
    }

    delete = async (req: Request<{id: string}>, res: Response): Promise<Response> => {
        try {
            const deletedCategory = await category.delete(req.user!.id, req.params.id)

            if (!deletedCategory) {
                return res.status(404).json({ error: "Category doesn't exists or has already been deleted" })
            }

            return res.status(200).json({ message: "Category deleted", category: deletedCategory })
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
        }
    }
}