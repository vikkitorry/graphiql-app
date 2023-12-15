import { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { validateMessages, validatePassword } from '../../utils/helpers/validation';
import Service from '../../app/service/service';
import cls from './sign-in-page.module.scss';
import { notification } from 'antd';

const SignInPage = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = async (values: Store) => {
    const { email, password } = values;
    try {
      await Service.signIn(email, password);
    } catch (err) {
      api.error({
        message: `Error`,
        description: `${err}`,
        placement: 'top',
      });
    }
  };

  return (
    <section>
      <>{contextHolder}</>
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
    </section>
  );
};

export default SignInPage;
