import { body } from 'express-validator';
import isNumeric from '../utils/isNumeric';

const createOrderValidator = [
    body('products').isArray(),
    body('products.*.id').custom(isNumeric),
    body('products.*.quantity')
];

const updateOrderValidator = [
    body('products').isArray().optional(),
    body('products.*.id').custom(isNumeric).optional(),
    body('products.*.quantity').custom(isNumeric).optional(),
];

export { createOrderValidator, updateOrderValidator };