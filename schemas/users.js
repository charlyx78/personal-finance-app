import { string, z } from "zod";

const userSchema = z.object({
    name: z.string().max(60),
    lastName: z.string().max(60),
    email: z.string().max(60).email(),
    password: z.string().min(8)
})

export function validateUser(object) {
    return userSchema.safeParse(object)
}