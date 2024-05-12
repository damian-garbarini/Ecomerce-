import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddlewareClass implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const actualDate = new Date();
    const date = actualDate.toLocaleDateString();
    const time = actualDate.toLocaleTimeString();

    console.log(
      `El metodo empleado es ${req.method}, la url es ${req.url}, la fecha es ${date} y son las ${time} `,
    );

    next();
  }
}
