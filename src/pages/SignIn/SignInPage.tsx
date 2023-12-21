import { useEffect, useState, useContext } from 'react';
import { Form, Input, Button } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { validateMessages, validatePassword } from '../../utils/helpers/validation';
import Service from '../../app/service/service';
import cls from './sign-in-page.module.scss';
import { notification } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { TranslatorContext } from '../../context/translatorContextProvider';

const SignInPage = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();
  const { lang, data } = useContext(TranslatorContext);

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
        layout={'vertical'}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: 'email',
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder={data[lang].email}
          />
        </Form.Item>

        <Form.Item name="password" rules={[{ validator: validatePassword }]}>
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder={data[lang].password}
          />
        </Form.Item>

        <Form.Item shouldUpdate>
          {() => (
            <Button
              className={cls.btn}
              type="primary"
              htmlType="submit"
              disabled={
                !clientReady ||
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              {data[lang].signIn}
            </Button>
          )}
        </Form.Item>
      </Form>
    </section>
  );
};

export default SignInPage;
