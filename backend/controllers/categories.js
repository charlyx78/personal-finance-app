import { Category } from "../models/Category.js"
import { SECRET_JWT_KEY } from "../config.js"
import jwt from 'jsonwebtoken'

const category = new Category()

export class CategoriesController {
    create = async (req, res) => {
        try {
            const accessToken = req.cookies.access_token
            const tokenObject = jwt.decode(accessToken, SECRET_JWT_KEY)
            const { user } = tokenObject

            const newCategory = await category.create({ input: req.body, userId: user.id })
            return res.status(201).json({ message: "Category created successfully!", category: newCategory })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    read = async (req, res) => {
        try {
            const accessToken = req.cookies.access_token
            const tokenObject = jwt.decode(accessToken, SECRET_JWT_KEY)
            const { user } = tokenObject

            const categories = await category.read({ userId: user.id })
            return res.status(200).json({ "message": "Categories found", categories: categories })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}