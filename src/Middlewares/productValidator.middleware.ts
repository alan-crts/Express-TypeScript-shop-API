import { body } from 'express-validator';
import isNumeric from '../utils/isNumeric';

const createProductValidator = [
    body('name').isString(),
    body('price').custom(isNumeric),
];

const updateProductValidator = [
    body('name').isString().optional(),
    body('price').custom(isNumeric).optional(),
];

export { createProductValidator, updateProductValidator };