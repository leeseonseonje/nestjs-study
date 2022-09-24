import { applyDecorators, createParamDecorator, ExecutionContext, Req } from "@nestjs/common";

export const Custom = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    console.log(data);
    // console.log(ctx);
    const request = ctx.switchToHttp().getRequest();
    return request.body[data];
  }
)

