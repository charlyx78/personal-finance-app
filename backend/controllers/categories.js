import { Category } from "../models/Category.js"
import { SECRET_JWT_KEY } from "../config.js"
import jwt from 'jsonwebtoken'
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
}