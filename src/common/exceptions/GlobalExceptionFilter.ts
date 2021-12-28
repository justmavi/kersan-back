import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import { DBError, UniqueViolationError, wrapError } from 'db-errors';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const errorInstance: { message?: string } = {};
    const responseObj: { status?: number; instance?: HttpException } = {};

    if (exception instanceof HttpException) {
      responseObj.status = exception.getStatus();
      responseObj.instance = exception;
    } else {
      const err = wrapError(exception);

      if (err instanceof DBError) {
        switch (err.constructor) {
          case UniqueViolationError:
            responseObj.status = HttpStatus.CONFLICT;
            errorInstance.message = 'Resource already exists';

            responseObj.instance = new ConflictException(errorInstance);
            break;
        }
      } else {
        responseObj.status = HttpStatus.INTERNAL_SERVER_ERROR;
        errorInstance.message = 'Something went wrong';

        responseObj.instance = new InternalServerErrorException(errorInstance);
      }
    }

    response.status(responseObj.status).json(responseObj.instance);
  }
}
