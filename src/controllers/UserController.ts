import User from '../models/User';
import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';

// Create A New User and store it in the database
export async function createNewUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { email, password, username } = req.body;

        // check if a user with this email or username already exists
        let existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res
                .status(409)
                .json({ message: 'User with this email already exists' });
        }
        existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res
                .status(409)
                .json({ message: 'User with this username already exists' });
        }

        const newUser = new User({
            email: email,
            password: password,
            username: username,
        });
        await newUser.save();
        return res.status(200).json({ message: 'Success' });
    } catch (err: any) {
        if (err.name === 'ValidationError') {
            return res.status(400).json(err.errors);
        }
        next(err);
    }
}