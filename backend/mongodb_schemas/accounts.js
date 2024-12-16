import mongoose from "mongoose";

export const accountsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true,
        min: 0
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        require: true
    }
}, { timestamps: true })

export const accountMongoDBModel = mongoose.model('accounts', accountsSchema)