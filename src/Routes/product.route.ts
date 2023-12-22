import express, { Router } from 'express';
import { listProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../Controllers/product.controller';
import checkRole from '../Middlewares/checkRole.middleware';
import { createProductValidator, updateProductValidator } from '../Middlewares/productValidator.middleware';
import validate from '../Middlewares/validate.middleware';

export default (app: Router) => {
    const productRouter = express.Router();

    productRouter.get('/', listProducts);

    productRouter.use(checkRole(['ADMIN', 'SUPERADMIN']));

    productRouter.get('/:id', getProduct);
    productRouter.post('/', createProductValidator, validate, createProduct);
    productRouter.put('/:id', updateProductValidator, validate, updateProduct);
    productRouter.delete('/:id', deleteProduct);
    
    app.use('/products', productRouter);
}