import { Schema, model, Date } from 'mongoose';
import { User } from './User';

export interface Image {
    source: string;
    title: string;
    description: string;
    author: User;
    uploadDate: Date;
    viewCount: number;
    likes: number;
    dislikes: number;
}

export const ImageSchema = new Schema<Image>({
    source: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    uploadDate: { type: Date, default: Date.now() },
    viewCount: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
});

const ImageModel = model<Image>('Image', ImageSchema);

export default ImageModel;
