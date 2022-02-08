import User from '../models/User';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

export async function getUserDetails(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const user = await User.findById(req.params.userID);
        if (!user) {
            return res.sendStatus(404);
        }

        return res.status(200).json({
            id: user._id,
            username: user.username,
            images: user.uploadedImages,
        });
    } catch (err) {
        next(err);
    }
}

// Create A New User and store it in the database
export async function createNewUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

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
        return res.sendStatus(201);
    } catch (err: any) {
        if (err.name === 'ValidationError') {
            res.status(400);
        }
        next(err);
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res
                .status(401)
                .json({ message: 'Invalid Email or Password' });
        }

        const isCorrectPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isCorrectPassword) {
            return res
                .status(401)
                .json({ message: 'Invalid Email or Password' });
        }
        const token = await jwt.sign(
            { id: user._id.toString() },
            process.env.TOKEN_SECRET!,
            { expiresIn: '24h' }
        );
        return res.status(200).json({ access_token: token });
    } catch (err) {
        next(err);
    }
}

export function logout(req: Request, res: Response, next: NextFunction) {
    try {
        return res.clearCookie('access_token').sendStatus(200);
    } catch (err) {
        next(err);
    }
}

export function checkAuthentication(req: Request, res: Response) {
    if (req.body.user) {
        return res.sendStatus(200);
    } else {
        return res.sendStatus(401);
    }
}
