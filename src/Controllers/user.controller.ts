import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import prisma from '../utils/database';

export const listUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({});

        const usersWithoutPassword = users.map((user) => {
            const userWithoutPassword: any = user;
            delete userWithoutPassword.password;
            return userWithoutPassword;
        });

        res.send(usersWithoutPassword);
    } catch (error) {
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

        if (!user) {
            return res.status(404).send({ message: `User with id ${id} not found` });
        }

        const userWithoutPassword: any = user;
        delete userWithoutPassword.password;

        res.send(userWithoutPassword);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const createUser = async (req: Request, res: Response) => {
    const { firstname, lastname, email, password, role } = req.body;

    try {
        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                firstname,
                lastname,
                email,
                password: encryptedPassword,
                role,
            },
        });

        const userWithoutPassword: any = newUser;
        delete userWithoutPassword.password;

        res.status(201).send(userWithoutPassword);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { firstname, lastname, email, password, role } = req.body;

    try {
        const encryptedPassword = password ? await bcrypt.hash(password, 10) : undefined;

        const updatedUser = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {
                firstname,
                lastname,
                email,
                password: encryptedPassword,
                role,
            },
        });

        const userWithoutPassword: any = updatedUser;
        delete userWithoutPassword.password;

        res.send(userWithoutPassword);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await prisma.user.delete({
            where: {
                id: Number(id),
            },
        });

        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
}