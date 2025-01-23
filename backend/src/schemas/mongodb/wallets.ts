import {Model,Schema,model} from "mongoose";
import { handleMongoosePostSaveErrors } from "../../middlewares/handleMongoosePostSaveErrors"
import { iWallets } from "../../interfaces/wallets";

type WalletsModel = Model<iWallets>

const walletsSchema = new Schema<iWallets, WalletsModel>({
    name: {
        type: String,
        maxlength: 20,
        required: true
    },
    balance: {
        type: Schema.Types.Decimal128,
        required: true,
        min: 1,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    status: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true })

walletsSchema.index({ name: 1, userId: 1 }, { unique: true, partialFilterExpression: { status: true } })

walletsSchema.post('save', handleMongoosePostSaveErrors)

export const walletsMongoDbModel = model<iWallets, WalletsModel>('wallets', walletsSchema)