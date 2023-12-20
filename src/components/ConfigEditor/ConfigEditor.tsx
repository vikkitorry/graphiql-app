import type { TabsProps } from 'antd';
import { ConfigProvider, Tabs } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import CodeMirror from '@uiw/react-codemirror';
import classes from './config-editor.module.scss';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Variables',
    children: <CodeMirror theme="light" height="250px" />,
  },
  {
    key: '2',
    label: 'Headers',
    children: <CodeMirror theme="light" height="250px" />,
  },
  {
    key: '3',
    label: '',
    icon: <CloseOutlined />,
  },
];

const ConfigEditor = () => {
  return (
    <div className={classes.config}>
      <ConfigProvider
        theme={{
          token: {
            colorBorderSecondary: 'transparent',
          },
          components: {
            Tabs: {
              horizontalItemPadding: '16px 40px 0px',
            },
          },
        }}
      >
        <Tabs defaultActiveKey="3" items={items} indicatorSize={0} />
      </ConfigProvider>
    </div>
  );
};

export default ConfigEditor;
