import { useEffect, useState, useCallback, useContext } from 'react';
import { Button, Drawer, Tooltip, Flex, Input, notification } from 'antd';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { SyncOutlined } from '@ant-design/icons';
import { buildClientSchema, GraphQLSchema } from 'graphql';
import { useDebounce } from 'use-debounce';
import { INTROSPECTION_QUERY } from '../../constants/constants';
import { TranslatorContext } from '../../context/translatorContextProvider';
import { json } from '@codemirror/lang-json';
import { handleApiError } from '../../utils/handleApiError';
import CodeMirror from '@uiw/react-codemirror';
import Documentation from '../../components/Documentation/Documentation';
import FunctionalEditor from '../../components/FunctionalEditor/FunctionalEditor';
import Loader from '../../components/Loader/Loader';
import classes from './graphiql-page.module.scss';

const GraphiQLPage = () => {
  const [documentationOpen, setDocumentationOpen] = useState(false);
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);
  const [schemaLoading, setSchemaLoading] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [responseLoading, setResponseLoading] = useState(false);
  const [apiURL, setApiURL] = useState<string>('');
  const [debouncedApiURL] = useDebounce(apiURL, 700);
  const [api, contextHolder] = notification.useNotification();
  const [graphqlResponse, setGraphqlResponse] = useState('');
  const [queryHeaders, setQueryHeaders] = useState({});
  const { lang, data } = useContext(TranslatorContext);

  const getSchema = useCallback(async () => {
    if (debouncedApiURL) {
      try {
        setSchemaLoading(true);
        const res = await fetch(debouncedApiURL, {
          method: 'POST',
          headers: queryHeaders,
          body: JSON.stringify({
            query: INTROSPECTION_QUERY,
          }),
        });
        if (!res.ok) {
          setConnectionError(true);
          const message = handleApiError(res);
          api.error({
            message: data[lang].error,
            description: message[lang],
            placement: 'top',
          });
        } else {
          const { data } = await res.json();
          setSchema(buildClientSchema(data));
          setConnectionError(false);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          setConnectionError(true);
        }
      } finally {
        setSchemaLoading(false);
      }
    }
  }, [debouncedApiURL, queryHeaders]);

  const onApiURLSubmit = useCallback(() => {
    setSchema(null);
    setDocumentationOpen(false);
    getSchema();
  }, [getSchema]);

  useEffect(() => {
    onApiURLSubmit();
  }, [debouncedApiURL]);

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
            prefix={
              <Tooltip
                placement="right"
                title={
                  debouncedApiURL === ''
                    ? data[lang].defaultStatus
                    : schemaLoading
                      ? data[lang].connectingStatus
                      : connectionError
                        ? data[lang].notConnectedStatus
                        : data[lang].connectedStatus
                }
              >
                <div
                  className={classes.connectionStatus}
                  style={{
                    backgroundColor:
                      debouncedApiURL === ''
                        ? 'grey'
                        : schemaLoading
                          ? 'yellow'
                          : connectionError
                            ? 'red'
                            : 'green',
                  }}
                />
              </Tooltip>
            }
            suffix={
              <Tooltip title={data[lang].refetchSchema}>
                <Button
                  type="text"
                  size="small"
                  icon={<SyncOutlined />}
                  loading={schemaLoading}
                  onClick={onApiURLSubmit}
                />
              </Tooltip>
            }
          />
          <Tooltip title={data[lang].exploreDocumentation}>
            <Button
              data-testid="documentation-button"
              className={classes.documentationButton}
              icon={<AiOutlineQuestionCircle size={20} />}
              onClick={() => setDocumentationOpen(!documentationOpen)}
              style={{
                backgroundColor: documentationOpen ? 'var(--light-panel-bg-color)' : 'transparent',
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
          {schema ? (
            <Drawer
              placement="right"
              closable={true}
              title={data[lang].apiDocumentation}
              mask={false}
              onClose={() => setDocumentationOpen(false)}
              open={documentationOpen}
              getContainer={false}
              styles={{ body: { padding: '0' } }}
              width="320px"
            >
              <Documentation schema={schema} />
            </Drawer>
          ) : null}
        </Flex>
      </Flex>
    </>
  );
};

export default GraphiQLPage;
