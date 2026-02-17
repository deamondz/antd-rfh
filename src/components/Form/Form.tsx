import { Form as AntdForm, type FormProps as AntdFormProps } from 'antd';
import type { ReactNode } from 'react';
import {
    type DefaultValues,
    type FieldValues,
    FormProvider,
    type SubmitHandler,
    type UseFormReturn,
} from 'react-hook-form';
import type { z } from 'zod';

export interface FormProps<TFieldValues extends FieldValues = FieldValues>
    extends Omit<AntdFormProps, 'form' | 'onFinish'> {
    form: UseFormReturn<TFieldValues>;
    schema?: z.ZodType<TFieldValues>;
    onSubmit?: SubmitHandler<TFieldValues>;
    initialValues?: DefaultValues<TFieldValues>;
    children?: ReactNode;
}

export const Form = <TFieldValues extends FieldValues = FieldValues>({
    form,
    onSubmit,
    children,
    initialValues,
    ...rest
}: FormProps<TFieldValues>) => {
    return (
        <FormProvider {...form}>
            <AntdForm layout="vertical" {...rest} onFinish={() => {
                console.log('test')
                form.handleSubmit(onSubmit || (() => {
                    console.log('valid')
                }), (...args) => {
                    console.log('invalid', args)
                })();
            }}>
                {children}
            </AntdForm>
        </FormProvider>
    );
};
