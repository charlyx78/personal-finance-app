import { Income } from "../models/Income.js";
import { NotFoundError } from "./errors.js";
import { Request, Response } from "express";
import { iTransactionsInput } from "../interfaces/transactions.js";
import { config } from "../config.js";

const income = new Income()

export class IncomesController {
    create = async (req: Request, res: Response) => {
        const {
            amount,
            categoryId,
            date,
            notes,
            walletId
        } = req.body

        const incomeData: iTransactionsInput = {
            amount,
            categoryId,
            date,
            notes,
            userId: req.user!.id,
            walletId
        }
        try {
            const newIncome = await income.create(incomeData)

            res.status(201).json({ message: 'Income created successfully!', income: newIncome })
        } catch (error: any) {
            res.status(500).json({ error: config.NODE_ENV === "PROD" ? "An unexpected error ocurred. Please try again" :  error.message })
        }
    }

    read = async (req: Request, res: Response) => {
        try {
            const incomes = await income.read(req.user!.id)

            if (incomes.length === 0) {
                res.status(404).json({ error: "Incomes not found" })
            }

            res.status(200).json({ message: 'Incomes found successfully!', incomes: incomes })
        } catch (error: any) {
            res.status(500).json({ error: config.NODE_ENV === "PROD" ? "An unexpected error ocurred. Please try again" :  error.message })
        }
    }

    readById = async (req: Request<{ id: string }>, res: Response) => {
        try {
            const incomeFound = await income.readById(req.params.id)

            if (!incomeFound) {
                res.status(404).json({ error: "Income not found" })
            }

            res.status(200).json({ message: 'Incomes found successfully', income: incomeFound })
        } catch (error: any) {
            res.status(500).json({ error: config.NODE_ENV === "PROD" ? "An unexpected error ocurred. Please try again" :  error.message })
        }
    }

    readByWalletId = async (req: Request<{ id: string }>, res: Response) => {
        try {
            const incomes = await income.readByWalletId(req.params.id)

            if (incomes.length === 0) {
                res.status(404).json({ error: "Incomes not found" })
            }

            res.status(200).json({ message: 'Incomes found successfully', incomes: incomes })
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

        const incomeData: Partial<iTransactionsInput> = {
            amount,
            categoryId,
            date,
            notes,
            walletId
        }

        try {
            const updatedIncome = await income.update(req.params.id, incomeData)

            res.status(200).json({ message: "Income updated successfully", income: updatedIncome })
        } catch (error: any) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ error: error.message })
            }
            res.status(500).json({ error: config.NODE_ENV === "PROD" ? "An unexpected error ocurred. Please try again" :  error.message })
        }
    }

    delete = async (req: Request<{ id: string }>, res: Response) => {
        try {
            const deletedIncome = await income.delete(req.params.id)

            res.status(200).json({ message: "Income deleted successfully", income: deletedIncome })
        } catch (error: any) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ error: error.message })
            }
            res.status(500).json({ error: config.NODE_ENV === "PROD" ? "An unexpected error ocurred. Please try again" :  error.message })
        }
    }
}