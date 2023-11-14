import { Request, Response } from "express";
import userService from "../services/user-services";
import httpStatus from "http-status";

async function createUser(req: Request, res: Response) {
    const body = req.body;
    try {
        const user = await userService.createUser(body);
        return res.status(httpStatus.CREATED).send("usuário criado");
    } catch (err) {
        if (err.name === 'BadRequestError') {
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function createSession(req: Request, res: Response) {
    const body = req.body;
    try {
        const user = await userService.createSession(body);
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