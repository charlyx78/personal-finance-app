import { Category } from "../models/Category.js"
import { AuthController } from "./auth.js"

const category = new Category()

export class CategoriesController {
    create = async (req, res) => {
        try {
            const newCategory = await category.create({ userId: req.user.id, input: req.body })
            return res.status(201).json({ message: "Category created successfully!", category: newCategory })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    read = async (req, res) => {
        try {
            const categories = await category.read({ userId: req.user.id })

            if (categories.length === 0) {
                return res.status(404).json({ error: "Categories not found" })
            }

            return res.status(200).json({ message: "Categories found", categories: categories })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    readById = async (req, res) => {
        try {
            const categoryFound = await category.readById({ userId: req.user.id, id: req.params.id })

            if (!categoryFound) {
                return res.status(404).json({ error: "Category not found" })
            }

            return res.status(200).json({ message: "Category found", categories: categoryFound })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    update = async (req, res) => {
        try {
            const updatedCategory = await category.update({ userId: req.user.id, id: req.params.id, input: req.body })

            if (!updatedCategory) {
                return res.status(404).json({ error: "Category doesn't exists or has been deleted" })
            }

            return res.status(200).json({ message: "Category updated", category: updatedCategory })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    delete = async (req, res) => {
        try {
            const deletedCategory = await category.delete({ userId: req.user.id, id: req.params.id })

            if (!deletedCategory) {
                return res.status(404).json({ error: "Category doesn't exists or has already been deleted" })
            }

            return res.status(200).json({ message: "Category deleted", category: deletedCategory })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}