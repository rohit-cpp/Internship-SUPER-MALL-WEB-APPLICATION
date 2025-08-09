import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

// Validate req.body against provided Joi schema
export const validateBody = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,    // gather all errors
      stripUnknown: true    // remove unknown keys
    });
    if (error) {
      const details = error.details.map(d => d.message);
      return res.status(422).json({
        success: false,
        message: "Validation failed",
        errors: details
      });
    }
    req.body = value;
    next();
  };
};
