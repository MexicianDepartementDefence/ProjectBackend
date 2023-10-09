import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Pagination = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();

console.log('req', request.query)
      return request.query;
    },
  );