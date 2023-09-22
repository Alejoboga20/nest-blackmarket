import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

type ProductMethods = 'create' | 'update' | 'delete' | 'findAll' | 'findOne';

interface ProductDescriptionOptions {
  isPrivate?: boolean;
}

export const ProductDescription = (
  methodName: ProductMethods,
  options?: ProductDescriptionOptions,
) => {
  const { isPrivate = false } = options || {};
  return applyDecorators(
    ApiOperation({
      summary: `Product ${methodName}`,
      description: `Endpoint to perform ${methodName} operation on products`,
    }),
    ApiOkResponse({
      description: `The product has been ${methodName}d successfully`,
      status: methodName === 'create' ? HttpStatus.CREATED : HttpStatus.OK,
    }),
    ApiHeader({
      name: 'Authorization',
      description: 'Bearer <token>',
      required: isPrivate,
    }),
  );
};
