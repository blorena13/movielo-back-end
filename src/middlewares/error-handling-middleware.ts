import httpStatus from "http-status";
import { AplicationError } from "../protocols";
import { NextFunction, Request, Response } from "express";

export function handleApplicationErrors(
    err: AplicationError | Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {

    if (err.name === 'BadRequestError') {
      return res.status(httpStatus.BAD_REQUEST).send({
        message: err.message,
      });
    }
  
    if (err.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send({
        message: err.message,
      });
    }
  
    console.error(err.name);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: 'InternalServerError',
      message: 'Internal Server Error',
    });
  }