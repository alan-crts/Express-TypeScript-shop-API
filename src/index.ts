import prisma from "./utils/database";
import express from "express";
import passport from "passport";
import morgan from "morgan";

import "./utils/passport";

import productRoute from "./Routes/product.route";
import orderRoute from "./Routes/order.route";
import authRoute from "./Routes/auth.route";
import userRoute from "./Routes/user.route";
import helmet from "helmet";

async function main() {
    const app = express();
    const port = 3000;

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(passport.initialize());
    app.use(morgan("combined"));
    app.use(helmet());
    
    authRoute(app);

    app.use(passport.authenticate('jwt', { session: false }));

    userRoute(app);
    productRoute(app);
    orderRoute(app);
    
    app.listen(port, () => {
        console.log(`Server listening on port ${port} 🚀`);
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        await prisma.$disconnect();
        process.exit(1);
    });