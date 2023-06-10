import { Schema, model, Types } from 'mongoose';
import { EFoodCategory } from './food.model';
import { IUser } from './user.model';

export enum EOrderStatus {
    WAIT_FOR_PAYMENT = 'wait for payment',
    CANCELLED = 'cancelled ',
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
    price: number;
    quantity: number;
}

export interface IOrder {
    user: IUser;
    items: Array<IItem>;
    address: string;
    status: EOrderStatus;
}

const schema = new Schema<IOrder>(
    {
        user: { type: Types.ObjectId, ref: 'User' },
        items: [],
        address: { type: String, required: true },
        status: {
            type: String,
            enum: EOrderStatus,
            default: EOrderStatus.WAIT_FOR_PAYMENT
        }
    },
    { timestamps: true }
);

export default model<IOrder>('Order', schema);
