import type { GraphQLSchema } from 'graphql';
import { useCallback, useState } from 'react';
import { Flex, Button, Tooltip } from 'antd';
import { SendOutlined, ClearOutlined } from '@ant-design/icons';
import { graphql } from 'cm6-graphql';
import CodeMirror from '@uiw/react-codemirror';
import QueryHeaders from './QueryHeaders/QueryHeaders';
import QueryVariables from './QueryVariables/QueryVariables';
import classes from './functional-editor.module.scss';

type FunctionalEditorProps = {
  schema: GraphQLSchema | null;
  apiUrl: string;
  setGraphqlResponse: React.Dispatch<React.SetStateAction<string>>;
};

const FunctionalEditor = ({ schema, apiUrl, setGraphqlResponse }: FunctionalEditorProps) => {
  const [queryOption, setQueryOption] = useState('');
  const [queryVariables, setQueryVariables] = useState({});
  const [queryHeaders, setQueryHeaders] = useState({});

  const sendRequest = async () => {
    const graphqlQuery = {
      operationName: null,
      query: queryOption,
      variables: queryVariables,
    };

    const responseFromApi = await fetch(apiUrl, {
      method: 'POST',
      headers: queryHeaders,
      body: JSON.stringify(graphqlQuery),
    });

    const data = await responseFromApi.json();
    setGraphqlResponse(JSON.stringify(data, null, 2));
  };

  const onChangeQueryOption = useCallback((value: string) => {
    setQueryOption(value);
  }, []);

  return (
    <Flex className={classes.editor}>
      <CodeMirror
        theme="light"
        height="100%"
        className={classes.codemirror}
        onChange={onChangeQueryOption}
        extensions={schema ? [graphql(schema)] : []}
      />

      <Flex className={classes.aside}>
        <Tooltip title="Execute query">
          <Button
            icon={<SendOutlined />}
            size="large"
            className={classes.send}
            onClick={sendRequest}
          />
        </Tooltip>

        <Tooltip title="Prettify query">
          <Button icon={<ClearOutlined />} size="large" className={classes.prettify} />
        </Tooltip>
      </Flex>

      <QueryVariables setQueryVariables={setQueryVariables} />
      <QueryHeaders queryHeaders={queryHeaders} setQueryHeaders={setQueryHeaders} />
    </Flex>
  );
};

export default FunctionalEditor;
