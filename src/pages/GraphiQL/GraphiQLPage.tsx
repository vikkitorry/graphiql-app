import { useEffect, useState, useCallback, useContext } from 'react';
import { Button, Drawer, Tooltip, Flex, Input, notification } from 'antd';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { SyncOutlined } from '@ant-design/icons';
import { buildClientSchema, GraphQLSchema } from 'graphql';
import { useDebounce } from 'use-debounce';
import { INTROSPECTION_QUERY } from '../../constants/constants';
import { TranslatorContext } from '../../context/translatorContextProvider';
import { json } from '@codemirror/lang-json';
import CodeMirror from '@uiw/react-codemirror';
import Documentation from '../../components/Documentation/Documentation';
import FunctionalEditor from '../../components/FunctionalEditor/FunctionalEditor';
import Loader from '../../components/Loader/Loader';
import classes from './graphiql-page.module.scss';

const GraphiQLPage = () => {
  const [documentationOpen, setDocumentationOpen] = useState(false);
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);
  const [schemaLoading, setSchemaLoading] = useState(false);
  const [responseLoading, setResponseLoading] = useState(false);
  const [apiURL, setApiURL] = useState<string>('');
  const [debouncedApiURL] = useDebounce(apiURL, 500);
  const [api, contextHolder] = notification.useNotification();
  const [graphqlResponse, setGraphqlResponse] = useState('');
  const [queryHeaders, setQueryHeaders] = useState({});
  const { lang, data } = useContext(TranslatorContext);

  const getSchema = useCallback(async () => {
    if (debouncedApiURL) {
      try {
        setSchemaLoading(true);
        const schemaFromApi = await fetch(debouncedApiURL, {
          method: 'POST',
          headers: queryHeaders,
          body: JSON.stringify({
            query: INTROSPECTION_QUERY,
          }),
        });
        const { data } = await schemaFromApi.json();
        setSchema(buildClientSchema(data));
      } catch {
        api.error({
          message: `Error`,
          description: `Connection could not be established. Please check the URL (make sure the chosen API supports CORS).`,
          placement: 'top',
        });
      } finally {
        setSchemaLoading(false);
      }
    }
  }, [debouncedApiURL, api]);

  const onApiURLSubmit = useCallback(() => {
    setSchema(null);
    setDocumentationOpen(false);
    getSchema();
  }, [getSchema]);

  useEffect(() => {
    onApiURLSubmit();
  }, [onApiURLSubmit]);

  return (
    <>
      {contextHolder}
      <Flex className={classes.content} data-testid="graphiQLPage">
        <div className={classes.header}>
          <Input
            value={apiURL}
            placeholder={data[lang].apiInputPlaceholder}
            className={classes.request}
            onChange={(e) => {
              setApiURL(e.target.value);
            }}
            onPressEnter={onApiURLSubmit}
            suffix={
              <Button
                type="text"
                size="small"
                icon={<SyncOutlined />}
                loading={schemaLoading}
                onClick={onApiURLSubmit}
              />
            }
          />
          <Tooltip title="Explore API Documentation">
            <Button
              className={classes.documentationButton}
              icon={<AiOutlineQuestionCircle size={20} />}
              onClick={() => setDocumentationOpen(!documentationOpen)}
              style={{
                backgroundColor: documentationOpen ? 'rgba(0, 0, 0, 0.078)' : 'transparent',
              }}
              disabled={!schema}
            />
          </Tooltip>
        </div>
        <Flex className={classes.body}>
          <Flex className={classes.settings}>
            <FunctionalEditor
              {...{ schema }}
              apiUrl={apiURL}
              setGraphqlResponse={setGraphqlResponse}
              setResponseLoading={setResponseLoading}
              queryHeaders={queryHeaders}
              setQueryHeaders={setQueryHeaders}
            />
          </Flex>

          <Flex className={classes.result}>
            {responseLoading ? (
              <Loader />
            ) : (
              <CodeMirror
                theme="light"
                height="100%"
                className={classes.codemirror}
                extensions={[json()]}
                editable={false}
                value={graphqlResponse}
              />
            )}
          </Flex>
          {schema && (
            <Drawer
              placement="right"
              closable={true}
              title={'API Documentation'}
              mask={false}
              onClose={() => setDocumentationOpen(false)}
              open={documentationOpen}
              getContainer={false}
            >
              <Documentation schema={schema} />
            </Drawer>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default GraphiQLPage;
