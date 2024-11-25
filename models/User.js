export class User {
    async create({ input }) {
        const {
            name,
            lastName,
            email,
            password
        } = input

        const newUser = {
            name,
            lastName,
            email,
            password
        }

        return newUser
    }
}