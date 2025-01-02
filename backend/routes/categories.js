import { Router } from "express";   
import { CategoriesController } from "../controllers/categories.js";

export function createCategoriesRouter() {
    const categoriesRouter = Router()

    const categoriesController = new CategoriesController()

    categoriesRouter.post('/', categoriesController.create)
    categoriesRouter.get('/', categoriesController.read)

    return categoriesRouter
}