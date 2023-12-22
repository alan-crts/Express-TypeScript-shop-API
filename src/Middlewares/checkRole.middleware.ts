import { Request, Response, NextFunction } from 'express';

export default (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user;

    if (!roles.includes(role)) {
        return res.status(403).send({ message: 'Unauthorized' });
    }

    next();
}