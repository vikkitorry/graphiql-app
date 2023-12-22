import { useState, useEffect } from 'react';
import { Button, Drawer, Tooltip } from 'antd';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { buildClientSchema, GraphQLSchema } from 'graphql';
import { INTROSPECTION_QUERY } from '../../constants/constants';
import { Flex, Input } from 'antd';
import { json } from '@codemirror/lang-json';
import CodeMirror from '@uiw/react-codemirror';
import Documentation from '../../components/Documentation/Documentation';
import FunctionalEditor from '../../components/FunctionalEditor/FunctionalEditor';
import ConfigEditor from '../../components/ConfigEditor/ConfigEditor';
import classes from './graphiql-page.module.scss';

const GraphiQLPage = () => {
  const [documentationOpen, setDocumentationOpen] = useState(false);
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);

  useEffect(() => {
    const getSchema = async () => {
      try {
        const schemaFromApi = await fetch('https://rickandmortyapi.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: INTROSPECTION_QUERY,
          }),
        });
        const { data } = await schemaFromApi.json();
        setSchema(buildClientSchema(data));
      } catch (error) {
        return null;
      }
    };

    getSchema();
  }, []);

  const toggleDocumentation = () => {
    setDocumentationOpen(!documentationOpen);
  };

  const onClose = () => {
    setDocumentationOpen(false);
  };

  return (
    <Flex className={classes.content}>
      <div className={classes.header}>
        <Input placeholder="Enter the API endpoint" className={classes.request} />
        <Tooltip title="Explore API Documentation">
          <Button
            className={classes.documentationButton}
            size="large"
            icon={<AiOutlineQuestionCircle size={20} />}
            onClick={toggleDocumentation}
            style={{ backgroundColor: documentationOpen ? 'rgba(0, 0, 0, 0.078)' : 'transparent' }}
            disabled={!schema}
          />
        </Tooltip>
      </div>
      <Flex className={classes.body}>
        <Flex className={classes.settings}>
          <FunctionalEditor />
          <ConfigEditor />
        </Flex>

        <Flex className={classes.result}>
          <CodeMirror
            theme="light"
            height="100%"
            className={classes.codemirror}
            extensions={[json()]}
            editable={false}
          />
        </Flex>
      </Flex>
      {schema && (
        <Drawer
          placement="right"
          closable={false}
          mask={false}
          onClose={onClose}
          open={documentationOpen}
          getContainer={false}
        >
          <Documentation schema={schema} />
        </Drawer>
      )}
    </Flex>
  );
};

export default GraphiQLPage;
