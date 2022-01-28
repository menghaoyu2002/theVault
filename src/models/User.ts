import { Schema, model } from 'mongoose';
import { IImage, ImageSchema } from './Image';
import bcrypt from 'bcryptjs';

export interface IUser {
    email: { type: string; required: true; unique: true };
    password: { type: string; required: true; min: 6 };
    username: { type: string; required: true; unique: true; min: 2; max: 32 };
    uploadedImages: IImage[];
    comparePasswords(candidatePassword: string): Promise<Boolean>;
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

/**
 * Compare the candidate password to the actual hashed password
 * @param candidatePassword the password to compare
 * @return true if the password match and false otherwise
 */
UserSchema.methods.comparePasswords = async function (
    candidatePassword: string
): Promise<Boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = model<IUser>('User', UserSchema);
export default User;
