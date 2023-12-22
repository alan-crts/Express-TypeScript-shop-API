import express, { Application } from 'express';
import { login, register } from '../Controllers/auth.controller';
import validate from '../Middlewares/validate.middleware';
import { signupValidator, signinValidator } from '../Middlewares/authValidator.middleware';
export default (app: Application) => {
    const authRouter = express.Router();

    authRouter.post('/signin', signinValidator, validate, login);
    authRouter.post('/signup', signupValidator, validate, register);

    app.use('/auth', authRouter);
}
