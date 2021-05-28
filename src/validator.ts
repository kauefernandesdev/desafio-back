/* eslint-disable @typescript-eslint/ban-types */
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  ExceptionFilter,
  Catch,
  ArgumentsHost,
} from '@nestjs/common';

import { Response } from 'express';

import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class HttpValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);

    const errors = await validate(object, {
      stopAtFirstError: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      skipMissingProperties: false,
      skipNullProperties: false,
      skipUndefinedProperties: false,
    });

    if (errors.length >= 1) {
      throw new ValidationException(
        'Bad request',
        HttpStatus.BAD_REQUEST,
        this.convert(errors),
      );
    }

    return object;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private convert(errors: ValidationError[]) {
    const validationErrors: ValidationErrors[] = [];

    errors.map((error) => {
      const arrayValues = Object.keys(error.constraints).map((attribute) => {
        return error.constraints[attribute];
      });

      const message = arrayValues[0];

      validationErrors.push({
        field: error.property,
        value: `${error.value}`,
        reason: message,
      });
    });

    return validationErrors;
  }
}

export interface ValidationErrors {
  field: string;
  value: string;
  reason: string;
}

export class ValidationException extends HttpException {
  constructor(
    message: string,
    httpCode: number,
    public errors: ValidationErrors[],
  ) {
    super(message, httpCode);
  }
}

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json(exception.errors);
  }
}
