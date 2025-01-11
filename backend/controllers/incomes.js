import { Income } from "../models/Income.js";
import { AuthController } from "./auth.js";

const income = new Income()

export class IncomesController {
    create = async (req, res) => {
        try {
            const newIncome = await income.create({ userId: req.user.id, input: req.body })

            return res.status(201).json({ message: 'Income created successfully', income: newIncome })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    read = async (req, res) => {
        try {
            const incomes = await income.read({ userId: req.user.id })

            if (incomes.length === 0) {
                return res.status(404).json({ message: "Incomes not found" })
            }

            return res.status(200).json({ message: 'Incomes found successfully', incomes: incomes })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    readById = async (req, res) => {
        try {
            const incomeFound = await income.readById({ userId: req.user.id, id: req.params.id }, {})

            if (!incomeFound) {
                return res.status(404).json({ message: "Income not found" })
            }

            return res.status(200).json({ message: 'Incomes found successfully', income: incomeFound })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    readByWalletId = async (req, res) => {
        try {
            const incomes = await income.readByWalletId({ userId: req.user.id, walletId: req.params.id }, {})

            if (incomes.length === 0) {
                return res.status(404).json({ message: "Incomes not found" })
            }

            return res.status(200).json({ message: 'Incomes found successfully', incomes: incomes })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}