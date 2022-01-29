import { Schema, model } from 'mongoose';
import { IImage, ImageSchema } from './Image';
import bcrypt from 'bcryptjs';

export interface IUser {
    email: string;
    password: string;
    username: string;
    uploadedImages: IImage[];
}

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    username: { type: String, required: true, minlength: 2, maxlength: 32 },
    uploadedImages: [ImageSchema],
});

UserSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

const User = model<IUser>('User', UserSchema);
export default User;
