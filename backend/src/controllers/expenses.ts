import { Expense } from "../models/Expense.js";
import { NotFoundError } from "./errors.js";

const expense = new Expense()

export class ExpensesController {
    create = async (req, res) => {
        try {
            const newExpense = await expense.create({ userId: req.user.id, input: req.body })

            return res.status(201).json({ message: 'Expense created successfully', expense: newExpense })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    read = async (req, res) => {
        try {
            const expenses = await expense.read({ userId: req.user.id })

            if (expenses.length === 0) {
                return res.status(404).json({ error: "Expenses not found" })
            }

            return res.status(200).json({ message: 'Expenses found successfully', expenses: expenses })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    readById = async (req, res) => {
        try {
            const expenseFound = await expense.readById({ userId: req.user.id, id: req.params.id }, {})

            if (!expenseFound) {
                return res.status(404).json({ error: "Expense not found" })
            }

            return res.status(200).json({ message: 'Expenses found successfully', expense: expenseFound })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    readByWalletId = async (req, res) => {
        try {
            const expenses = await expense.readByWalletId({ userId: req.user.id, walletId: req.params.id }, {})

            if (expenses.length === 0) {
                return res.status(404).json({ error: "Expenses not found" })
            }

            return res.status(200).json({ message: 'Expenses found successfully', expenses: expenses })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    update = async (req, res) => {
        try {
            const updatedExpense = await expense.update({ userId: req.user.id, input: req.body })

            return res.status(200).json({ message: "Expense updated successfully", expense: updatedExpense })
        } catch (error) {
            if (error instanceof NotFoundError) {
                return res.status(404).json({ error: error.message })
            }
            return res.status(500).json({ error: error.message })
        }
    }

    delete = async (req, res) => {
        try {
            const deletedExpense = await expense.delete({ userId: req.user.id, id: req.params.id })

            return res.status(200).json({ message: "Expense deleted successfully", expense: deletedExpense })
        } catch (error) {
            if (error instanceof NotFoundError) {
                return res.status(404).json({ error: error.message })
            }
            return res.status(500).json({ error: error.message })
        }
    }
}