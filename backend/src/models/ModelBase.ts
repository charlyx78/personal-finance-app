import { Schema } from "mongoose"

export abstract class ModelBase<T> {
    abstract create(userId: string, input: Partial<T>): Promise<Partial<T>>
    abstract read(userId: string): Promise<Partial<T>[] | null>
    abstract readById(userId: string, id: string): Promise<Partial<T> | null>
    abstract update(userId: string, id: string, input: T): Promise<Partial<T> | null>
    abstract delete(userId: string, id: string): Promise<Partial<T> | null>
}