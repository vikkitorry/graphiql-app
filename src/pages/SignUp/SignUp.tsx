import { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { Store } from 'antd/lib/form/interface';
import {
  validateMessages,
  validatePassword,
} from '../../utils/helpers/validation';
import Service from '../../app/service/service';

export const SignUp = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState<boolean>(false);

  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = (values: Store) => {
    const { email, password } = values;
    Service.signUp(email, password);
    console.log('Received values:', values);
  };

  return (
    <Form
      form={form}
      name="signup"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            type: 'email',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true }, { validator: validatePassword }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item shouldUpdate>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !clientReady ||
              !form.isFieldsTouched(true) ||
              !!form.getFieldsError().filter(({ errors }) => errors.length)
                .length
            }
          >
            Sign Up
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};
