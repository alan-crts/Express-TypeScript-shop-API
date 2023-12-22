import prisma from "../utils/database";
import { Request, Response } from "express";

export const listOrders = async (req: Request, res: Response) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                products: {
                    include: {
                        product: true,
                    },
                }
            },
        });
    
        res.send(orders);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getOrder = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const order = await prisma.order.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                products: {
                    include: {
                        product: true,
                    },
                }
            },
        });

        if (!order) {
            return res
                .status(404)
                .send({ message: `Order with id ${id} not found` });
        }

        res.send(order);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const createOrder = async (req: Request, res: Response) => {
    const { products } = req.body;
    const userId = req.user.id;

    try {
        const newOrder = await prisma.order.create({
            data: {
                userId,
                products: {
                    create: products.map((product: { id: number, quantity: number }) => ({
                        quantity: product.quantity,
                        product: { connect: { id: product.id } }
                    })),
                },
            },
            include: {
                products: {
                    include: {
                        product: true,
                    },
                }
            },
        });
        
        res.status(201).send(newOrder);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { products } = req.body;
    const userId = req.user.id;

    try {
        const updatedOrder = await prisma.order.update({
            where: {
                id: Number(id),
            },
            data: {
                userId,
                products: {
                    deleteMany: {},
                    create: products.map((product: { id: number, quantity: number }) => ({
                        quantity: product.quantity,
                        product: { connect: { id: product.id } }
                    })),
                },
            },
        });

        res.send(updatedOrder);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteOrder = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedOrder = await prisma.order.delete({
            where: {
                id: Number(id),
            },
            include: {
                products: {
                    include: {
                        product: true,
                    },
                }
            },
        });

        res.send(deletedOrder);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const listProducts = async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany();

        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
};