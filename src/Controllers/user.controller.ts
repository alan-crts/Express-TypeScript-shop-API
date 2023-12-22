import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import prisma from '../utils/database';

export const listUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({});

        res.send(users);
    } catch(error) {
        res.status(500).send(error);
    }
}

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id),
            },
        });

        if(!user) {
            return res.status(404).send({ message: `User with id ${id} not found` });
        }

        res.send(user);
    } catch(error) {
        res.status(500).send(error);
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { firstname, lastname, email, password } = req.body;

    try {
        const encryptedPassword = await bcrypt.hash(password, 10);

        const updatedUser = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {
                firstname,
                lastname,
                email,
                password: encryptedPassword,
            },
        });
        res.send(updatedUser);
    } catch(error) {
        res.status(500).send(error);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedUser = await prisma.user.delete({
            where: {
                id: Number(id),
            },
        });

        res.send(deletedUser);
    } catch(error) {
        res.status(500).send(error);
    }
}