import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

type CategoryMethods = 'create' | 'update' | 'delete' | 'findAll' | 'findOne';

export const CategoryDescription = (methodName: CategoryMethods) => {
  return applyDecorators(
    ApiOperation({
      summary: `Category ${methodName}`,
      description: `Endpoint to perform ${methodName} operation on categories`,
    }),
    ApiOkResponse({
      description: `The category has been ${methodName}d successfully`,
      status: methodName === 'create' ? HttpStatus.CREATED : HttpStatus.OK,
    }),
  );
};
