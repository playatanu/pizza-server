import { Model, Schema, HydratedDocument, model, Types } from 'mongoose';
import { IOrder } from './order.model';

export enum ERole {
    ADMIN = 'admin',
    CUSTOMER = 'customer'
}

export interface IProvider {
    id: string;
    name: string;
}

export interface IUser {
    name: string;
    photo: string;
    providers: IProvider[];
    email?: string;
    phone?: string;
    role?: string;
    address?: string[];
    orders?: IOrder[];
}

interface UserModel extends Model<IUser, object> {
    findByProvider(provider: IProvider): Promise<HydratedDocument<IUser>>;
}

const schema = new Schema<IUser, UserModel>(
    {
        name: { type: String },
        photo: { type: String },
        providers: [{ type: Object, select: false }],
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

schema.static(
    'findByProvider',
    async function findByProvider(provider: IProvider) {
        return await this.findOne({ providers: { $elemMatch: provider } });
    }
);

export default model<IUser, UserModel>('User', schema);
