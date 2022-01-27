import { Image } from './Image';

export interface User {
    email: string;
    password: string;
    username: string;
    uploadedImages: Image[];
}
