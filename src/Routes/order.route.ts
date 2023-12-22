import express, { Router } from 'express';
import { listOrders, getOrder, createOrder, updateOrder, deleteOrder } from '../Controllers/order.controller';
import checkRole from '../Middlewares/checkRole.middleware';
import validate from '../Middlewares/validate.middleware';
import { createOrderValidator, updateOrderValidator, getOrDeleteOrderValidator } from '../Middlewares/orderValidator.middleware';

export default (app: Router) => {
    const orderRouter = express.Router();

    orderRouter.post('/', createOrderValidator, validate, createOrder);

    orderRouter.use(checkRole(['ADMIN', 'SUPERADMIN']));

    orderRouter.get('/', listOrders);
    orderRouter.get('/:id', getOrDeleteOrderValidator, validate, getOrder);
    orderRouter.put('/:id', updateOrderValidator, validate, updateOrder);
    orderRouter.delete('/:id', getOrDeleteOrderValidator, validate, deleteOrder);

    app.use('/orders', orderRouter);
}