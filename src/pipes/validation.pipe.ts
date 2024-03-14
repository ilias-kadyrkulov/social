import { ArgumentMetadata, PipeTransform } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { ValidationException } from 'src/exceptions/validation.exception'

export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata) {
        console.log(metadata.metatype)

        if (!metadata.metatype || !this.toValidate(metadata.metatype)) {
            return value
        }

        const obj = plainToClass(metadata.metatype, value)
        const errors = await validate(obj, {})

        if (errors.length) {
            console.log(errors)

            let errorObj = {}
            for (let i = 0; i < errors.length; i++) {
                errorObj[errors[i].property] = Object.values(
                    errors[i].constraints
                ).join(' ')
            }
            throw new ValidationException(errorObj)
        }

        return value
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object]
        return !types.includes(metatype)
    }
}
