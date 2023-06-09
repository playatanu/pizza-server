import { Model, Schema, HydratedDocument, model } from 'mongoose';

export enum EFoodCategory {
    UNKNOWN = 'unknown',
    PIZZA = 'pizza',
    SIDE = 'side',
    DESSERT = 'dessert',
    DRIKN = 'drink'
}

export interface IVarient {
    name: string;
    price: number;
}

export interface IFood {
    name: string;
    dec?: string;
    image: string;
    varients: Array<IVarient>;
    category: string;
    active: boolean;
}

interface FoodModel extends Model<IFood, object> {
    findByCategory(category: string): Promise<HydratedDocument<Array<IFood>>>;
}

const schema = new Schema<IFood, FoodModel>(
    {
        name: { type: String, required: true },
        dec: { type: String },
        category: {
            type: String,
            enum: EFoodCategory,
            default: EFoodCategory.UNKNOWN,
            required: true
        },
        image: { type: String, required: true },
        varients: [],
        active: { type: Boolean, default: true }
    },
    { timestamps: true }
);

schema.static('findByCategory', async function findByCategory(category) {
    return await this.find({ category });
});

export default model<IFood, FoodModel>('Food', schema);
