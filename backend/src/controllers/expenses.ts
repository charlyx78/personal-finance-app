import { Expense } from "../models/Expense.js";
import { NotFoundError } from "./errors.js";
import { Request, Response } from "express";
import { iTransactionsInput } from "../interfaces/transactions.js";
import { config } from "../config.js";
const expense = new Expense()

export class ExpensesController {
    create = async (req: Request, res: Response) => {
        const {
            amount,
            categoryId,
            date,
            notes,
            walletId
        } = req.body

        const expenseData: iTransactionsInput = {
            amount,
            categoryId,
            date,
            notes,
            userId: req.user!.id,
            walletId
        }
        try {
            const newExpense = await expense.create(expenseData)

            res.status(201).json({ message: 'Expense created successfully!', expense: newExpense })
        } catch (error: any) {
            res.status(500).json({ error: config.NODE_ENV === "PROD" ? "An unexpected error ocurred. Please try again" :  error.message })
        }
    }

    read = async (req: Request, res: Response) => {
        try {
            const expenses = await expense.read(req.user!.id)

            if (expenses.length === 0) {
                res.status(404).json({ error: "Expenses not found" })
            }

            res.status(200).json({ message: 'Expenses found successfully', expenses: expenses })
        } catch (error: any) {
            res.status(500).json({ error: config.NODE_ENV === "PROD" ? "An unexpected error ocurred. Please try again" :  error.message })
        }
    }

    readById = async (req: Request<{ id: string }>, res: Response) => {
        try {
            const expenseFound = await expense.readById(req.params.id)

            if (!expenseFound) {
                res.status(404).json({ error: "Expense not found" })
            }

            res.status(200).json({ message: 'Expenses found successfully', expense: expenseFound })
        } catch (error: any) {
            res.status(500).json({ error: config.NODE_ENV === "PROD" ? "An unexpected error ocurred. Please try again" :  error.message })
        }
    }

    readByWalletId = async (req: Request<{ id: string }>, res: Response) => {
        try {
            const expenses = await expense.readByWalletId(req.params.id)

            if (expenses.length === 0) {
                res.status(404).json({ error: "Expenses not found" })
            }

            res.status(200).json({ message: 'Expenses found successfully', expenses: expenses })
        } catch (error: any) {
            res.status(500).json({ error: config.NODE_ENV === "PROD" ? "An unexpected error ocurred. Please try again" :  error.message })
        }
    }

    update = async (req: Request<{ id: string }>, res: Response) => {
        const {
            amount,
            categoryId,
            date,
            notes,
            walletId
        } = req.body

        const expenseData: Partial<iTransactionsInput> = {
            amount,
            categoryId,
            date,
            notes,
            walletId
        }

        try {
            const updatedExpense = await expense.update(req.params.id, expenseData)

            res.status(200).json({ message: "Expense updated successfully", expense: updatedExpense })
        } catch (error: any) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ error: error.message })
            }
            res.status(500).json({ error: config.NODE_ENV === "PROD" ? "An unexpected error ocurred. Please try again" :  error.message })
        }
    }

    delete = async (req: Request<{ id: string }>, res: Response) => {
        try {
            const deletedExpense = await expense.delete(req.params.id)

            res.status(200).json({ message: "Expense deleted successfully", expense: deletedExpense })
        } catch (error: any) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ error: error.message })
            }
            res.status(500).json({ error: config.NODE_ENV === "PROD" ? "An unexpected error ocurred. Please try again" :  error.message })
        }
    }
}