import { Model, Schema, HydratedDocument, model } from 'mongoose';

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
}

interface UserModel extends Model<IUser, object> {
    findByProvider(
        id: string,
        provider: string
    ): Promise<HydratedDocument<IUser>>;
}

const schema = new Schema<IUser, UserModel>(
    {
        id: { type: String },
        displayName: { type: String },
        photos: [],
        provider: { type: String },
        email: { type: String },
        phone: { type: String },
        role: { type: String, enum: ERole, default: ERole.CUSTOMER },
        address: []
    },
    { timestamps: true }
);

schema.static('findByProvider', async function findByProvider(id, provider) {
    return await this.findOne({ id, provider });
});

export default model<IUser, UserModel>('User', schema);
