import { Schema } from "mongoose"

export interface iUsers {
    name: Schema.Types.ObjectId,
    lastName: string,
    email: string,
    password: string,
    sessionToken?: string,
    status?: boolean
}

export interface iUserSessionData {
    user: {
        _id: string,
        name: string,
        lastName: string,
        email: string
    }
}

export interface iUsersInput {
    name: string,
    lastName: string,
    email: string,
    password: string,
    sessionToken?: string,
}

export interface iUsersOutput {
    _id: Schema.Types.ObjectId,
    name: string,
    lastName: string,
    email: string,
    password: string,
    sessionToken: string,
    status: boolean
}