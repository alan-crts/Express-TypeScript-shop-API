import { body, param } from 'express-validator';
import isNumeric from '../utils/isNumeric';
import prisma from '../utils/database';
const createProductValidator = [
    body('name').isString(),
    body('price').custom(isNumeric),
];

const updateProductValidator = [
    param('id').isInt().custom(async (value) => {
        const product = await prisma.product.findUnique({
            where: {
                id: Number(value),
            },
        });

        if (!product) {
            return Promise.reject(`Product with id ${value} not found`);
        }

        return true;
    }),
    body('name').isString().optional(),
    body('price').custom(isNumeric).optional(),
];

export { createProductValidator, updateProductValidator };