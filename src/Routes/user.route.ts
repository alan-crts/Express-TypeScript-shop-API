import express,{ Application }  from 'express';
import { listUsers, getUser, updateUser, deleteUser } from '../Controllers/user.controller';
import checkRole from '../Middlewares/checkRole.middleware';

export default (app: Application) => {
    const userRouter = express.Router();

    userRouter.use(checkRole(['SUPERADMIN']));

    userRouter.get('/', listUsers);
    userRouter.get('/:id', getUser);
    userRouter.put('/:id', updateUser);
    userRouter.delete('/:id', deleteUser);
    
    app.use('/users', userRouter);
}