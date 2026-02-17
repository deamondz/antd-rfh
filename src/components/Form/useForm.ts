import { zodResolver } from '@hookform/resolvers/zod';
import { type FieldValues, type UseFormProps, useForm as useHookForm } from 'react-hook-form';
import z from 'zod';

export const useForm = <TFieldValues extends FieldValues = FieldValues>(
    props?: UseFormProps<TFieldValues> & { schema?: z.ZodType<TFieldValues> },
) => {
    return useHookForm<TFieldValues>({
        ...props,
        resolver: props?.schema ? zodResolver(props.schema) : undefined,
    });
};
