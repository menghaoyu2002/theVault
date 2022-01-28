import { Schema, model, Date } from 'mongoose';
import { IUser } from './User';

export interface IImage {
    source: string;
    title: string;
    description: string;
    author: IUser;
    uploadDate: Date;
    viewCount: number;
    likes: number;
    dislikes: number;
}

export const ImageSchema = new Schema<IImage>({
    source: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    uploadDate: { type: Date, default: Date.now() },
    viewCount: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
});

const Image = model<IImage>('Image', ImageSchema);

export default Image;
