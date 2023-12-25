import { useCallback } from 'react';
import { Flex, Button, Tooltip } from 'antd';
import { SendOutlined, ClearOutlined } from '@ant-design/icons';
import CodeMirror from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import type { GraphQLSchema } from 'graphql';
import classes from './functional-editor.module.scss';

type FunctionalEditorProps = {
  schema: GraphQLSchema | null;
};
const FunctionalEditor = ({ schema }: FunctionalEditorProps) => {
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
        extensions={schema ? [graphql(schema)] : []}
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
