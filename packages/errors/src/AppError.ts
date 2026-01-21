export abstract class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public errorCode: string,
    public isOperational = true
  ) {
    super(message);
  }
}