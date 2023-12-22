import { body, param } from "express-validator";
import prisma from "../utils/database";

const createUserValidator = [
  body("firstname").isString(),
  body("lastname").isString(),
  body("email").isEmail().custom(async (value) => {
    const user = await prisma.user.findUnique({
      where: {
        email: value,
      },
    });

    if (user) {
      return Promise.reject("Email already in use");
    }

    return true;
  }),
  body("password").isLength({ min: 5 }),
  body("role").isIn(["USER", "ADMIN", "SUPERADMIN"]).optional(),
];

const updateUserValidator = [
  param("id").isInt().custom(async (value) => {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(value),
      },
    });

    if (!user) {
      return Promise.reject(`User with id ${value} not found`);
    }

    return true;
  }),
  body("firstname").isString().optional(),
  body("lastname").isString().optional(),
  body("email").isEmail().optional(),
  body("password").isLength({ min: 5 }).optional(),
  body("role").isIn(["USER", "ADMIN", "SUPERADMIN"]).optional(),
];

const getOrDeleteUserValidator = [
  param("id").isInt()
];

export { createUserValidator, updateUserValidator, getOrDeleteUserValidator };