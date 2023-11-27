import { Request, Response } from "express";
import userService from "../services/user-services";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "../middlewares/authentication-middleware";

async function createUser(req: Request, res: Response) {
    const body = req.body;
    try {
        const user = await userService.createUser(body);
        return res.status(httpStatus.CREATED).send("usuário criado");
    } catch (err) {
        if (err.name === 'BadRequestError') {
            return res.status(httpStatus.BAD_REQUEST).send(err.message)
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function createSession(req: AuthenticatedRequest, res: Response) {
    const body = req.body;
    const userId = req.userId;
    try {
        const user = await userService.createSession(body, userId);
        return res.status(httpStatus.CREATED).send(user);

    } catch (err) {
        if (err.name === 'NotFoundError') {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

const userController = {
    createUser,
    createSession
}

export default userController;