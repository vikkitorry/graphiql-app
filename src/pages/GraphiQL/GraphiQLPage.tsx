import { useState, useEffect } from 'react';
import { Button, Drawer, Tooltip } from 'antd';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { buildClientSchema, GraphQLSchema } from 'graphql';
import { INTROSPECTION_QUERY } from '../../constants/constants';
import Documentation from '../../components/Documentation/Documentation';
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
    <>
      <div className={classes.header}>
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
      {schema && (
        <div className={classes.container}>
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
        </div>
      )}
    </>
  );
};

export default GraphiQLPage;
