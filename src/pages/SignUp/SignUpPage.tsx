import { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { validateMessages, validatePassword } from '../../utils/helpers/validation';
import Service from '../../app/service/service';
import cls from './sign-up-page.module.scss';
import { notification } from 'antd';

const SignUpPage = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = async (values: Store) => {
    const { email, password } = values;
    try {
      await Service.signUp(email, password);
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
        name="signup"
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
          <Input placeholder={'Email'} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true }, { validator: validatePassword }]}
        >
          <Input.Password placeholder={'Password'} />
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
              Sign Up
            </Button>
          )}
        </Form.Item>
      </Form>
    </section>
  );
};

export default SignUpPage;
