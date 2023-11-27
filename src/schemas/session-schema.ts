import Joi from "joi";

export const sessionSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})