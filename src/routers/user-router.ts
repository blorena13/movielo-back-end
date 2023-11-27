import { Router } from "express";
import { validateBody } from "../middlewares/validation-middleware";
import { userSchema } from "../schemas";
import userController from "../controllers/user-controller";
import { sessionSchema } from "../schemas/session-schema";

const userRouter = Router();
userRouter.post('/sign-up', validateBody(userSchema), userController.createUser);
userRouter.post('/sign-in', validateBody(sessionSchema), userController.createSession);

export { userRouter };