import { Schema } from "mongoose"

export abstract class ModelBase<Input, Output> {
    abstract create(input: Input): Promise<Partial<Output>>
    abstract read(userId: string): Promise<Partial<Output[]>>
    abstract readById(id: string): Promise<Partial<Output | null>>
    abstract update(id: string, input: Partial<Input>): Promise<Partial<Output | null>>
    abstract delete(id: string): Promise<Partial<Output | null>>
}