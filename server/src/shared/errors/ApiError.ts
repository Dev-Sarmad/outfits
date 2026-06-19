class ApiError extends Error {
  statusCode: number;
  data: null;
  error: string[];
  success: boolean;
  constructor(
    statusCode: number,
    message: string,
    error: string[],
    stack?: string,
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.error = error;
    this.success = false;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export {ApiError};