import { walletsMongoDbModel } from "../schemas/mongodb/wallets"
import { Schema } from "mongoose"
import { ModelBase } from "./ModelBase"
import { iWalletsInput, iWalletsOutput } from "../interfaces/wallets"

export class Wallet extends ModelBase<iWalletsInput, iWalletsOutput> {

    async create(input: iWalletsInput): Promise<Partial<iWalletsOutput>> {
        try {
            const walletCreated: Partial<iWalletsOutput> = await walletsMongoDbModel.create(input)
            return walletCreated
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async read(userId: string): Promise<Partial<iWalletsOutput[]>> {
        try {
            const wallets: Partial<iWalletsOutput[]> = await walletsMongoDbModel.find(
                { userId: userId, status: true },
                { name: 1, balance: 1, type: 1 }
            )

            return wallets
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async readById(id: string): Promise<Partial<iWalletsOutput | null>> {
        try {
            const wallet: Partial<iWalletsOutput | null> = await walletsMongoDbModel.findOne(
                { _id: id, status: true },
                { name: 1, balance: 1, type: true }
            )
            return wallet
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async update(id: string, input: Partial<iWalletsInput>) : Promise<Partial<iWalletsOutput | null>> {
        try {
            const updatedWallet: Partial<iWalletsOutput | null> = await walletsMongoDbModel.findOneAndUpdate({ _id: id, status: true }, {
                $set: input
            }, {
                new: true,
                projection: {
                    name: 1,
                    balance: 1
                }
            })

            return updatedWallet
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async delete(id: string): Promise<Partial<iWalletsOutput | null>> {
        try {
            const deletedWallet: Partial<iWalletsOutput | null> = await walletsMongoDbModel.findOneAndUpdate({ _id: id, status: true }, {
                status: false
            }, {
                new: true,
                projection: {
                    name: 1,
                    balance: 1,
                    type: 1,
                    status: 1
                }
            })

            return deletedWallet
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}