const createErrorFactory = function(name) {
    return class BusinessError extends Error {
        constructor(message) {
            super(message)
        }
    }
}

export const DuplicatedKeyError = createErrorFactory('DuplicatedKeyError')
export const ValidationError = createErrorFactory('ValidationError')
export const NotFoundError = createErrorFactory('NotFoundError')
export const AuthenticationError = createErrorFactory('NotFoundError')