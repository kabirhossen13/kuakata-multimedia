import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IInquiry extends Document {
    name: string;
    email: string;
    phone: string;
    projectType: string;
    budgetRange: string;
    timeline: string;
    message: string;
    status: 'New' | 'Contacted' | 'Closed';
    createdAt: Date;
    updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        projectType: { type: String, required: true },
        budgetRange: { type: String, required: true },
        timeline: { type: String, required: true },
        message: { type: String, required: true },
        status: {
            type: String,
            required: true,
            enum: ['New', 'Contacted', 'Closed'],
            default: 'New',
        },
    },
    { timestamps: true }
);

export default models.Inquiry || model<IInquiry>('Inquiry', InquirySchema);
