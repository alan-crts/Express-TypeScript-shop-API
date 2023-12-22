import { body } from "express-validator";

const userValidator = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  body("role").isIn(["USER", "ADMIN", "SUPERADMIN"]).optional(),
];

export { userValidator };