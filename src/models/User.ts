import { Schema, model } from 'mongoose';
import { Image, ImageSchema } from './Image';

export interface User {
    email: string;
    password: string;
    username: string;
    uploadedImages: Image[];
}

const UserSchema = new Schema<User>({
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    username: { type: String, required: true, minlength: 2, maxlength: 32 },
    uploadedImages: [ImageSchema],
});

const UserModel = model<User>('User', UserSchema);

export default UserModel;
