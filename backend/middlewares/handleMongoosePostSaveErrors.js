import { DuplicatedKeyError } from "../controllers/errors.js"

export const handleMongoosePostSaveErrors = (error, doc, next) => {
    if(error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0]
        const value = error.keyValue[field]
        const message = `${field} is already on use`
        next(new DuplicatedKeyError(message))
    } else {
        next(error)
    }
}