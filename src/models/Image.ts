import { Schema, model, Date } from 'mongoose';
import { IUser } from './User';

export interface IImage {
    source: string;
    public_id: string;
    title: string;
    description: string;
    author: IUser;
    uploadDate: Date;
    viewCount: number;
}

export const ImageSchema = new Schema<IImage>({
    source: { type: String, required: true },
    public_id: { type: String, required: true },
    title: { type: String, required: true, max: 32 },
    description: { type: String, max: 300 },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    uploadDate: { type: Date, default: Date.now() },
    viewCount: { type: Number, default: 0 },
});

const Image = model<IImage>('Image', ImageSchema);

export default Image;
