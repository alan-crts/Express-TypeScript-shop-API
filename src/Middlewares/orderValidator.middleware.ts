import { body, param } from 'express-validator';
import isNumeric from '../utils/isNumeric';
import prisma from '../utils/database';

const createOrderValidator = [
    body('products').isArray(),
    body('products.*.id').custom(isNumeric).custom(async (value) => {
        const product = await prisma.product.findUnique({
            where: {
                id: Number(value),
            },
        });

        if (!product) {
            return Promise.reject(`Product with id ${value} not found`);
        }
    }),
    body('products.*.quantity')
];

const updateOrderValidator = [
    param('id').isInt().custom(async (value) => {
        const order = await prisma.order.findUnique({
            where: {
                id: Number(value),
            },
        });

        if (!order) {
            return Promise.reject(`Order with id ${value} not found`);
        }

        return true;
    }),
    body('products').isArray().optional(),
    body('products.*.id').custom(isNumeric).optional(),
    body('products.*.quantity').custom(isNumeric).optional(),
];

export { createOrderValidator, updateOrderValidator };