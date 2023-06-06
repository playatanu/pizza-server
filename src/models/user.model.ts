import { Model, Schema, HydratedDocument, model } from 'mongoose';

interface IUser {
    name: string;
    email: string;
    phone: string;
    password: string;
}

interface UserModel extends Model<IUser, object> {
    findByEmail(email: string): Promise<HydratedDocument<IUser>>;
}

const schema = new Schema<IUser, UserModel>({
    name: { type: String },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true, select: false }
});

schema.static('findByEmail', async function findByEmail(email) {
    return await this.findOne({ email: email });
});

export default model<IUser, UserModel>('User', schema);
