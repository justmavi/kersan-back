import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  DBError,
  ForeignKeyViolationError,
  UniqueViolationError,
  wrapError,
} from 'db-errors';
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

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
          case ForeignKeyViolationError:
            errorInstance.message = 'Depended resource does not exists';

            responseObj.status = HttpStatus.NOT_FOUND;
            responseObj.instance = new NotFoundException(errorInstance);
            break;
          default:
            this.logger.error('', err.nativeError);

            break;
        }
      } else {
        this.logger.error('', exception);
      }
    }

    response.status(responseObj.status).json(responseObj.instance);
  }
}
