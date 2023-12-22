import express,{ Router }  from 'express';
import { listUsers, getUser, updateUser, deleteUser } from '../Controllers/user.controller';
import checkRole from '../Middlewares/checkRole.middleware';
import validate from '../Middlewares/validate.middleware';
import { updateUserValidator } from '../Middlewares/userValidator.middleware';
export default (app: Router) => {
    const userRouter = express.Router();

    userRouter.use(checkRole(['SUPERADMIN']));

    userRouter.get('/', listUsers);
    userRouter.get('/:id', getUser);
    userRouter.put('/:id', updateUserValidator, validate, updateUser);
    userRouter.delete('/:id', deleteUser);
    
    app.use('/users', userRouter);
}