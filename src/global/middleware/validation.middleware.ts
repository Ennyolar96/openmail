import { plainToInstance, type ClassConstructor } from "class-transformer";
import {
  validate,
  type ValidationError,
  type ValidatorOptions,
} from "class-validator";
import type { NextFunction, Request, RequestHandler, Response } from "express";

class RequestValidationError extends Error {
  public readonly statusCode = 422;

  constructor(public readonly errors: ValidationError[]) {
    super("Validation failed");
    this.name = "RequestValidationError";
  }
}

const defaultValidatorOptions: ValidatorOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  skipMissingProperties: false,
  validationError: { target: false, value: false },
};

export const validateBody = <T extends object>(
  dto: ClassConstructor<T>,
  options?: ValidatorOptions,
): RequestHandler => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const payload = plainToInstance(dto, req.body);
      const errors = await validate(payload, {
        ...defaultValidatorOptions,
        ...options,
      });

      if (errors.length > 0) {
        return next(new RequestValidationError(errors));
      }

      req.body = payload;
      return next();
    } catch (error) {
      return next(error);
    }
  };
};

const formatValidationErrors = (errors: ValidationError[]): unknown[] => {
  return errors.map((error) => {
    if (error.children?.length) {
      return {
        field: error.property,
        children: formatValidationErrors(error.children),
      };
    }

    return {
      field: error.property,
      messages: Object.values(error.constraints ?? {}),
    };
  });
};

export const appErrorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (res.headersSent) {
    next(error);
    return;
  }

  const env = process.env.NODE_ENV === "development";

  if (error instanceof RequestValidationError) {
    res.status(error.statusCode).json({
      status: error.statusCode,
      success: false,
      message: error.message,
      errors: formatValidationErrors(error.errors),
    });
    return;
  }

  if (error instanceof Error) {
    res.status(400).json({
      success: false,
      status: 400,
      message: error.message,
      ...(env && { stack: error.stack }),
      errors: error.name,
    });
    return;
  }

  res.status(500).json({
    success: false,
    status: 500,
    message: "Something went wrong",
    errors: "Internal server error",
  });
};
