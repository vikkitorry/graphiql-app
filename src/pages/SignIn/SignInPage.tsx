import { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { validateMessages, validatePassword } from '../../utils/helpers/validation';
import Service from '../../app/service/service';
import cls from './sign-in-page.module.scss';

const SignInPage = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState<boolean>(false);

  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = (values: Store) => {
    const { email, password } = values;
    Service.signIn(email, password);
  };

  return (
    <Form
      form={form}
      name="signin"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      validateMessages={validateMessages}
      className={cls.container}
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
              !!form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Sign In
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default SignInPage;
