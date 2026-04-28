import { type ClassConstructor } from "class-transformer";
import { type ValidatorOptions } from "class-validator";
import type { NextFunction, Request, RequestHandler, Response } from "express";
export declare const validateBody: <T extends object>(dto: ClassConstructor<T>, options?: ValidatorOptions) => RequestHandler;
export declare const appErrorHandler: (error: unknown, _req: Request, res: Response, next: NextFunction) => void;
