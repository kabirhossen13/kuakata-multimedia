import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    role: 'admin';
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        role: { type: String, required: true, enum: ['admin'], default: 'admin' },
    },
    { timestamps: true }
);

export default models.User || model<IUser>('User', UserSchema);
