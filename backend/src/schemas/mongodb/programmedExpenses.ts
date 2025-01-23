// import mongoose from "mongoose";
// import { handleMongoosePostSaveErrors } from "../../middlewares/handleMongoosePostSaveErrors";

// export const programmedExpensesSchema = new mongoose.Schema({
//     amount: {
//         type: mongoose.Types.Decimal128,
//         min: 1,
//         required: true,
//     },
//     categoryId: {
//         type: mongoose.Types.ObjectId,
//         ref: 'categories',
//         required: true
//     },
//     programmedDate: {
//         type: Date,
//         required: true
//     },
//     frequency: {
//         type: String,
//         enum: ['daily', 'weekly', 'monthly'],
//         default: 'monthly',
//         required: true,
//     },
//     walletId: {
//         type: mongoose.Types.ObjectId,
//         ref: 'wallets',
//         required: true,
//     },
//     paid: {
//         type: Boolean,
//         default: false,
//         required: true
//     },
//     allowNotification: {
//         type: Boolean,
//         default: false,
//         required: true
//     },
//     allowAutoPerformance: {
//         type: Boolean,
//         default: false,
//         required: true
//     },
//     status: {
//         type: Boolean,
//         default: true,
//         required: true
//     }
// }, { timestamps: true })

// programmedExpenses.post('save', handleMongoosePostSaveErrors())

// export const programmedExpensesMongoDbModel = mongoose.model('programmedeExpenses', programmedExpensesSchema)
