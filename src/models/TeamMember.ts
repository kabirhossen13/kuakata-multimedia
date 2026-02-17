import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface ITeamMember extends Document {
    name: string;
    role: string;
    bio: string;
    experienceYears: number;
    skills: string[];
    status: 'Active' | 'Inactive' | 'On Project';
    image: string;
    socialLinks: {
        facebook?: string;
        twitter?: string;
        instagram?: string;
        linkedin?: string;
    };
    projects: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const TeamMemberSchema = new Schema<ITeamMember>(
    {
        name: { type: String, required: true },
        role: { type: String, required: true },
        bio: { type: String, required: true },
        experienceYears: { type: Number, required: true },
        skills: [{ type: String }],
        status: {
            type: String,
            required: true,
            enum: ['Active', 'Inactive', 'On Project'],
            default: 'Active',
        },
        image: { type: String, required: true },
        socialLinks: {
            facebook: String,
            twitter: String,
            instagram: String,
            linkedin: String,
        },
        projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    },
    { timestamps: true }
);

export default models.TeamMember || model<ITeamMember>('TeamMember', TeamMemberSchema);
