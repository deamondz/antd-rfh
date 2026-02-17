import { Button, Checkbox, Input, InputNumber } from 'antd';
import { z } from 'zod';
import { Form, FormItem, useForm } from './components/Form';

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    quantity: z.number(),
    status: z.boolean(),
});

function App() {
    const form = useForm({ schema });
    const { formState: { errors }, } = form;

    return (
        <Form
            form={form}
            onSubmit={(values) => {
                console.log('values', values);
            }}
        >
            <FormItem label="Email" name="name" required>
                <Input type="email" placeholder="Input" />
            </FormItem>

            <FormItem label="Quantity" name="quantity" required>
                <InputNumber />
            </FormItem>

            <FormItem name="status" required valuePropName="checked">
                <Checkbox>Status</Checkbox>
            </FormItem>

            <Button htmlType="submit">Submit</Button>

            {JSON.stringify(errors, null, 4)}
        </Form>
    );
}

export default App;
