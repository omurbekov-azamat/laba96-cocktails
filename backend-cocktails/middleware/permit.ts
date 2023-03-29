import {NextFunction, Request, Response} from 'express';
import {RequestWithUser} from './auth';

const permit = (...roles: string[]) => {
    return (expressReq: Request, res: Response, next: NextFunction) => {
        const req = expressReq as RequestWithUser;

        if (!req.user) {
            return res.send(401).send({message: 'Unauthenticated'});
        }

        if (!roles.includes(req.user.role)) {
            return res.send(403).send({'message': 'Unauthorized'});
        }

        return next();
    };
};

export default permit;