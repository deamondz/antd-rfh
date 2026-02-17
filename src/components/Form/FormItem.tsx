import { Form as AntdForm, type FormItemProps } from 'antd';
import { cloneElement, isValidElement } from 'react';
import { type FieldValues, type Path, useController, useFormContext } from 'react-hook-form';

export const FormItem = <TFieldValues extends FieldValues = FieldValues>({
    name,
    children,
    ...restProps
}: Omit<FormItemProps, 'name'> & {
    name: Path<TFieldValues>;
}) => {
    const formContext = useFormContext<TFieldValues>();
    const { field: { value, ...field }, fieldState } = useController({
        name,
        control: formContext.control,
    });

    if (!isValidElement(children)) {
        throw new Error('Provide proper children to FormItem');
    }

    return (
        <AntdForm.Item
            {...restProps}
            validateStatus={fieldState.error ? 'error' : undefined}
            help={fieldState.error?.message}
        >
            {cloneElement(children, {
                ...field,
                [restProps.valuePropName ?? 'value']: value,
                onChange: (...args: unknown[]) => {
                    const value =
                        args[0] && typeof args[0] === 'object' && 'target' in args[0]
                            ? (args[0] as any).target[restProps.valuePropName ?? 'value']
                            : args[0];

                    console.log('onChange', ...args)

                    field.onChange(value);
                    children.props?.onChange?.(...args);
                },
                onBlur: (...args: unknown[]) => {
                    field.onBlur();
                    children.props?.onBlur?.(...args);
                },
            })}
        </AntdForm.Item>
    );
};
