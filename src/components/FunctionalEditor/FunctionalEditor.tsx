import { useCallback } from 'react';
import { Flex, Button, Tooltip } from 'antd';
import { SendOutlined, ClearOutlined } from '@ant-design/icons';
import { json } from '@codemirror/lang-json';
import CodeMirror from '@uiw/react-codemirror';
import classes from './functional-editor.module.scss';

const FunctionalEditor = () => {
  const onChangeCodeMirror = useCallback((value: string) => {
    console.log('value:', value);
  }, []);

  return (
    <Flex className={classes.editor}>
      <CodeMirror
        theme="light"
        height="100%"
        className={classes.codemirror}
        onChange={onChangeCodeMirror}
        extensions={[json()]}
      />

      <Tooltip title="Execute query">
        <Button icon={<SendOutlined />} size="large" className={classes.send} />
      </Tooltip>

      <Tooltip title="Prettify query">
        <Button icon={<ClearOutlined />} size="large" className={classes.prettify} />
      </Tooltip>
    </Flex>
  );
};

export default FunctionalEditor;
