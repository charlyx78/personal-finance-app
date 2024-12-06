import { Auth } from "../models/Auth.js";

const auth = new Auth()

export class AuthController {
    login = async (req, res) => {
        try {
            const userLogged = await auth.login({ input: req.body })
            return res.status(200).json({ user: userLogged })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}