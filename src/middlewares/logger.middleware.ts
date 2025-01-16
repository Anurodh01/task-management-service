// request-logger.middleware.ts
import { HttpStatus, Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {}
  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl } = req;
    this.logger.info(`Request: ${originalUrl} ${method}`);
    if (
      req.method === 'POST' ||
      req.method === 'PATCH' ||
      req.method === 'PUT'
    ) {
      if (Object.keys(req.body).length === 0) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Request Body Not Provided!',
          timestamp: Date.now(),
          statusCode: HttpStatus.BAD_REQUEST,
        });
        return;
      }
      this.logger.info('Request Body: ' + JSON.stringify(req.body));
    }
    const start = Date.now();

    //Log of response time at response finish
    res.on('finish', () => {
      const responseTime = Date.now() - start;
      this.logger.info(
        'Request Completed: ' +
          JSON.stringify({
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            responseTime,
          }),
      );
    });

    next();
  }
}
