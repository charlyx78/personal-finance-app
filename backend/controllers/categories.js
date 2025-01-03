import { Category } from "../models/Category.js"
import { AuthController } from "./auth.js"

const category = new Category()

export class CategoriesController {
    create = async (req, res) => {
        try {
            const user = await AuthController.getLoggedUser(req, res)

            const newCategory = await category.create({ input: req.body, userId: user.id })
            return res.status(201).json({ message: "Category created successfully!", category: newCategory })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    read = async (req, res) => {
        try {
            const user = await AuthController.getLoggedUser(req, res)

            const categories = await category.read({ userId: user.id })
            return res.status(200).json({ "message": "Categories found", categories: categories })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    update = async (req, res) => {
        try {
            const updatedCategory = await category.update({ input: req.body, id: req.params.id })

            return res.status(200).json({ "message": "Category updated", category: updatedCategory })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    delete = async (req, res) => {
        try {
            const deletedCategory = await category.delete({ id: req.params.id })

            return res.status(200).json({ "message": "Category deleted", category: deletedCategory })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}