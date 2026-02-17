import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IProject extends Document {
    title: string;
    slug: string;
    category: 'Drama' | 'Short Film' | 'Documentary' | 'Web Series' | 'Commercial';
    releaseYear: number;
    genre: string;
    duration: string;
    synopsis: string;
    trailerUrl: string;
    poster: string;
    gallery: string[];
    cast: string[];
    crew: { role: string; name: string }[];
    awards?: string[];
    featured: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        category: {
            type: String,
            required: true,
            enum: ['Drama', 'Short Film', 'Documentary', 'Web Series', 'Commercial'],
        },
        releaseYear: { type: Number, required: true },
        genre: { type: String, required: true },
        duration: { type: String, required: true },
        synopsis: { type: String, required: true },
        trailerUrl: { type: String, required: true },
        poster: { type: String, required: true },
        gallery: [{ type: String }],
        cast: [{ type: String }],
        crew: [
            {
                role: { type: String, required: true },
                name: { type: String, required: true },
            },
        ],
        awards: [{ type: String }],
        featured: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default models.Project || model<IProject>('Project', ProjectSchema);
