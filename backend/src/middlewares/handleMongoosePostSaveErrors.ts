import { DuplicatedKeyError } from "../controllers/errors"
import { HydratedDocument } from "mongoose"

export const handleMongoosePostSaveErrors = (error: any, doc: HydratedDocument<any>, next: Function) => {
    if(error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0]
        const value = error.keyValue[field]
        const message = `${field} is already on use`
        next(new DuplicatedKeyError(message))
    } else {
        next(error)
    }
}