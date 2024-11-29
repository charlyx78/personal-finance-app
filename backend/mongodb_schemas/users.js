import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        hide: true,
        required: true
    },
},  { timestamps: true })

export const userMongoDbModel = mongoose.model('users', usersSchema)