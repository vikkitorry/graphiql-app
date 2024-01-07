import type { GraphQLSchema } from 'graphql';
import { useCallback, useContext, useState } from 'react';
import { Flex, Button, Tooltip } from 'antd';
import { SendOutlined, ClearOutlined } from '@ant-design/icons';
import { TranslatorContext } from '../../context/translatorContextProvider';
import { graphql } from 'cm6-graphql';
import { prettify } from '../../utils/prettify';
import CodeMirror from '@uiw/react-codemirror';
import QueryHeaders from './QueryHeaders/QueryHeaders';
import QueryVariables from './QueryVariables/QueryVariables';
import classes from './functional-editor.module.scss';

type FunctionalEditorProps = {
  schema: GraphQLSchema | null;
  apiUrl: string;
  queryHeaders: Record<string, string>;
  setQueryHeaders: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  setGraphqlResponse: React.Dispatch<React.SetStateAction<string>>;
  setResponseLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const FunctionalEditor = ({
  schema,
  apiUrl,
  queryHeaders,
  setQueryHeaders,
  setGraphqlResponse,
  setResponseLoading,
}: FunctionalEditorProps) => {
  const [queryOption, setQueryOption] = useState('');
  const [queryVariables, setQueryVariables] = useState({});
  const { lang, data } = useContext(TranslatorContext);

  const sendRequest = async () => {
    setResponseLoading(true);

    try {
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
    } finally {
      setResponseLoading(false);
    }
  };

  const onChangeQueryOption = useCallback((value: string) => {
    setQueryOption(value);
  }, []);

  return (
    <Flex className={classes.editor}>
      <CodeMirror
        value={queryOption}
        theme="light"
        height="100%"
        className={classes.codemirror}
        onChange={onChangeQueryOption}
        extensions={schema ? [graphql(schema)] : []}
      />

      <Flex className={classes.aside}>
        <Tooltip
          title={
            apiUrl ? data[lang].sendButtonTooltipEnabled : data[lang].sendButtonTooltipDisabled
          }
        >
          <Button
            icon={<SendOutlined />}
            size="large"
            onClick={sendRequest}
            disabled={apiUrl ? false : true}
          />
        </Tooltip>

        <Tooltip title={data[lang].prettifyButtonTooltip}>
          <Button
            icon={<ClearOutlined />}
            size="large"
            onClick={() => setQueryOption(prettify(queryOption))}
          />
        </Tooltip>
      </Flex>

      <QueryVariables setQueryVariables={setQueryVariables} />
      <QueryHeaders queryHeaders={queryHeaders} setQueryHeaders={setQueryHeaders} />
    </Flex>
  );
};

export default FunctionalEditor;
