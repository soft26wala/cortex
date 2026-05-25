// src/shared/errors.ts
// ─────────────────────────────────────────────────────────────────────
// HTTP EXCEPTIONS & ERROR HANDLING
// ─────────────────────────────────────────────────────────────────────

export class HttpException extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string,
    public details?: Record<string, any>
  ) {
    super(message)
    this.name = 'HttpException'
  }
}

export class BadRequest extends HttpException {
  constructor(message: string, code?: string, details?: Record<string, any>) {
    super(400, message, code, details)
    this.name = 'BadRequest'
  }
}

export class Unauthorized extends HttpException {
  constructor(message: string = 'Unauthorized', code?: string) {
    super(401, message, code)
    this.name = 'Unauthorized'
  }
}

export class Forbidden extends HttpException {
  constructor(message: string = 'Forbidden', code?: string) {
    super(403, message, code)
    this.name = 'Forbidden'
  }
}

export class NotFound extends HttpException {
  constructor(message: string = 'Not found', code?: string) {
    super(404, message, code)
    this.name = 'NotFound'
  }
}

export class Conflict extends HttpException {
  constructor(message: string, code?: string, details?: Record<string, any>) {
    super(409, message, code, details)
    this.name = 'Conflict'
  }
}

export class TooManyRequests extends HttpException {
  constructor(message: string = 'Too many requests', code?: string) {
    super(429, message, code)
    this.name = 'TooManyRequests'
  }
}

export class UnprocessableEntity extends HttpException {
  constructor(message: string = 'Unprocessable entity', code?: string, details?: Record<string, any>) {
    super(422, message, code, details)
    this.name = 'UnprocessableEntity'
  }
}

export class InternalServerError extends HttpException {
  constructor(message: string = 'Internal server error', code?: string) {
    super(500, message, code)
    this.name = 'InternalServerError'
  }
}

export class QuotaExceeded extends HttpException {
  constructor(message: string = 'Monthly message quota exceeded', code?: string) {
    super(429, message, code ?? 'QUOTA_EXCEEDED')
    this.name = 'QuotaExceeded'
  }
}

// ─────────────────────────────────────────────────────────────────────
// ERROR HANDLER MIDDLEWARE
// ─────────────────────────────────────────────────────────────────────

import { Request, Response, NextFunction } from 'express'
import { logger } from './logger'

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof HttpException) {
    return res.status(err.statusCode).json({
      error: err.message,
      code: err.code,
      details: err.details,
    })
  }

  // Database errors
  if (err.code === 'ECONNREFUSED') {
    logger.error({ err }, 'Database connection failed')
    return res.status(503).json({
      error: 'Database connection failed',
      code: 'DB_UNAVAILABLE',
    })
  }

  // Unexpected errors
  logger.error(
    {
      err,
      requestId: (req as any).id,
      method: req.method,
      path: req.path,
    },
    'Unhandled error'
  )

  res.status(500).json({
    error: 'Internal server error',
    code: 'INTERNAL_ERROR',
    ...(process.env.NODE_ENV === 'development' && { message: err.message }),
  })
}

// ─────────────────────────────────────────────────────────────────────
// ASYNC WRAPPER (catches async errors in route handlers)
// ─────────────────────────────────────────────────────────────────────

export function asyncHandler(fn: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}