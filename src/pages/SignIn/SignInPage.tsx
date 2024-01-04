import { useEffect, useState, useContext } from 'react';
import { Form, Input, Button } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { validateMessages, validatePassword } from '../../utils/helpers/validation';
import { AppRoutes } from '../../routes/routeConfig/routeConfig';
import Service from '../../app/service/service';
import cls from './sign-in-page.module.scss';
import { notification } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { TranslatorContext } from '../../context/translatorContextProvider';
import { NavLink } from 'react-router-dom';
import { handleFirebaseError } from '../../utils/helpers/handleFirebaseError';

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
      const message = handleFirebaseError(err as Error);
      api.error({
        message: lang === 'en' ? `Error` : 'Ошибка',
        description: `${message[lang]}`,
        placement: 'top',
      });
    }
  };

  return (
    <section className={cls.section}>
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
              data-testid="submit"
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
        <p className={cls.desc}>
          {data[lang].or} <NavLink to={AppRoutes.SIGN_UP}>{data[lang].regLink}!</NavLink>
        </p>
      </Form>
    </section>
  );
};

export default SignInPage;
