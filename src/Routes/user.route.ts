import express, { Router } from 'express';
import { listUsers, getUser, updateUser, deleteUser, createUser } from '../Controllers/user.controller';
import checkRole from '../Middlewares/checkRole.middleware';
import validate from '../Middlewares/validate.middleware';
import { updateUserValidator, getOrDeleteUserValidator, createUserValidator } from '../Middlewares/userValidator.middleware';
export default (app: Router) => {
    const userRouter = express.Router();

    userRouter.use(checkRole(['SUPERADMIN']));

    userRouter.get('/', listUsers);
    userRouter.get('/:id', getOrDeleteUserValidator, validate, getUser);
    userRouter.post('/', createUserValidator, validate, createUser);
    userRouter.put('/:id', updateUserValidator, validate, updateUser);
    userRouter.delete('/:id', getOrDeleteUserValidator, validate, deleteUser);

    app.use('/users', userRouter);
}