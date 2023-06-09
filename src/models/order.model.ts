import { Schema, model, Types } from 'mongoose';
import { EFoodCategory, IFood, IVarient } from './food.model';
import { IUser } from './user.model';

export enum EOrderStatus {
    PLACED = 'placed',
    CONFIRMATION = 'confirmation',
    PREPARATION = 'preparation',
    OUT_FOR_DELIVERY = 'out for delivery',
    COMPLETE = 'complete'
}

export interface IItem {
    name: string;
    dec: string;
    category: EFoodCategory;
    image: string;
    varient: string;
}

export interface IOrder {
    user: IUser;
    items: Array<IItem>;
    total: number;
    address: string;
    status: EOrderStatus;
}

const schema = new Schema<IOrder>(
    {
        user: { type: Types.ObjectId, ref: 'User' },
        items: [],
        total: { type: Number, required: true },
        address: { type: String, required: true },
        status: {
            type: String,
            enum: EOrderStatus,
            default: EOrderStatus.PLACED
        }
    },
    { timestamps: true }
);

export default model<IOrder>('Order', schema);
