import { body } from "express-validator";
import prisma from "../utils/database";

const signupValidator = [
    body("firstname").isString(),
    body("lastname").isString(),
    body("email").isEmail().custom(async (value) => {
        const user = await prisma.user.findUnique({
            where: {
                email: value,
            },
        });

        if (user) {
            return Promise.reject("Email already exists");
        }

        return true;
    }),
    body("password").isLength({ min: 5 }),
];

const signinValidator = [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
];

export { signupValidator, signinValidator };