import { Request, Response } from "express";
import userService from "../services/user-services";
import httpStatus from "http-status";

async function createUser(req: Request, res: Response) {
    const body = req.body;
    try {
        const user = await userService.createUser(body, body.password);
        return res.status(httpStatus.CREATED).send("usuário criado");
    } catch (err) {
        if (err.name === 'BadRequestError') {
            return res.status(httpStatus.BAD_REQUEST).send(err.message)
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
            return res.status(httpStatus.NOT_FOUND).send(err.message);
        }
        if (err.name === 'BadRequestError') {
            return res.status(httpStatus.BAD_REQUEST).send(err.message)
        }
        if (err.name === 'invalidCredentialsError') {
            return res.status(httpStatus.CONFLICT).send(err.message)
        }

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    }
}

const userController = {
    createUser,
    createSession
}

export default userController;