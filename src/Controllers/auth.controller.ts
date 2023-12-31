import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import prisma from '../utils/database';

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            return res.status(404).send({ message: `email or password incorrect` });
        }

        const isPasswordValid = bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({ message: `email or password incorrect` });
        }

        const userWithoutPassword: any = user;
        delete userWithoutPassword.password;


        const token = jwt.sign({ user: userWithoutPassword }, process.env.JWT_SECRET, {
            expiresIn: 86400
        });

        res.send({ user: userWithoutPassword, token });
    } catch (error) {
        res.status(500).send(error);
    }
}

export const register = async (req: Request, res: Response) => {
    const { firstname, lastname, email, password } = req.body;

    try {
        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                firstname,
                lastname,
                email,
                password: encryptedPassword,
            },
        });

        const userWithoutPassword: any = newUser;

        delete userWithoutPassword.password;

        res.status(201).send(userWithoutPassword);
    } catch (error) {
        res.status(500).send(error);
    }
}