import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IService extends Document {
    title: string;
    description: string;
    features: string[];
    pricing: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        features: [{ type: String }],
        pricing: { type: String, required: true },
        active: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default models.Service || model<IService>('Service', ServiceSchema);
