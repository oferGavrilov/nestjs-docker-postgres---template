import { createParamDecorator, ExecutionContext } from "@nestjs/common"

export const getUser = createParamDecorator(
    (ctx: ExecutionContext , data?: string | undefined) => {
        const request: Express.Request = ctx
            .switchToHttp()
            .getRequest()

        if(data) {
            return request.user[data]
        }
        return request.user
    }
)