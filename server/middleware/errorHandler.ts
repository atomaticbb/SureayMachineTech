import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Handle Zod validation errors
  if (err instanceof ZodError || (err.name === 'ZodError' && err.errors)) {
    const errors = (err.errors || []).map((error: any) => ({
      field: error.path ? error.path.join('.') : 'unknown',
      message: error.message || 'Validation error',
    }));

    console.error('[VALIDATION ERROR]', errors);

    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  // Handle Multer errors (file upload)
  if (err.name === 'MulterError') {
    const message =
      err.code === 'LIMIT_FILE_SIZE'
        ? 'File is too large. Maximum allowed size is 15 MB.'
        : `File upload error: ${err.message}`;
    console.error('[MULTER ERROR]', err.code, err.message);
    return res.status(400).json({ success: false, message });
  }

  // Handle fileFilter rejection (plain Error thrown by multer fileFilter)
  if (err.message && err.message.startsWith('Invalid file type')) {
    console.error('[FILE TYPE ERROR]', err.message);
    return res.status(400).json({ success: false, message: err.message });
  }

  // Handle other errors
  const statusCode = (err as AppError).statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[ERROR] ${statusCode} - ${message}`, err);

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
