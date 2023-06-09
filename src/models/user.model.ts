import { Model, Schema, HydratedDocument, model, Types } from 'mongoose';

export enum ERole {
    ADMIN = 'admin',
    CUSTOMER = 'customer'
}

export interface IUser {
    id: string;
    displayName: string;
    photos: [];
    provider: string;
    email: string;
    phone: string;
    role: string;
    address: [];
    orders: [];
}

interface UserModel extends Model<IUser, object> {
    findByProvider(
        id: string,
        provider: string
    ): Promise<HydratedDocument<IUser>>;
}

const schema = new Schema<IUser, UserModel>(
    {
        id: { type: String, select: false },
        displayName: { type: String },
        photos: [],
        provider: { type: String, select: false },
        email: { type: String },
        phone: { type: String },
        role: {
            type: String,
            enum: ERole,
            default: ERole.CUSTOMER,
            select: false
        },
        address: [{ type: String, select: false }],
        orders: [{ type: Types.ObjectId, ref: 'Order', select: false }]
    },
    { timestamps: true }
);

schema.static('findByProvider', async function findByProvider(id, provider) {
    return await this.findOne({ id, provider });
});

export default model<IUser, UserModel>('User', schema);
