import { Income } from "../models/Income.js";

const income = new Income()

export class IncomesController {
    create = async(req, res) => {
        try {
            const newIncome = await income.create(req.body)
            return res.status(201).json({ message: 'Income created successfully', income: newIncome })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}