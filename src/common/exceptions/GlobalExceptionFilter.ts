import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { DBError, UniqueViolationError, wrapError } from 'db-errors';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const errorInstance: { message?: string } = {
      message: 'Something went wrong',
    };
    const responseObj: { status?: number; instance?: HttpException } = {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      instance: new InternalServerErrorException(errorInstance),
    };

    if (exception instanceof HttpException) {
      responseObj.status = exception.getStatus();
      responseObj.instance = exception;
    } else {
      const err = wrapError(exception);

      if (err instanceof DBError) {
        switch (err.constructor) {
          case UniqueViolationError:
            errorInstance.message = 'Resource already exists';

            responseObj.status = HttpStatus.CONFLICT;
            responseObj.instance = new ConflictException(errorInstance);
            break;
        }
      }
    }

    console.log(exception);

    response.status(responseObj.status).json(responseObj.instance);
  }
}
