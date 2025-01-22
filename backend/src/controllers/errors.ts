const createErrorFactory = function(name: string) {
    return class BusinessError extends Error {
        constructor(message: string) {
            super(message)
        }
    }
}

export const DuplicatedKeyError = createErrorFactory('DuplicatedKeyError')
export const ValidationError = createErrorFactory('ValidationError')
export const NotFoundError = createErrorFactory('NotFoundError')
export const AuthenticationError = createErrorFactory('NotFoundError')