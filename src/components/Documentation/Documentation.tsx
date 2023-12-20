import { useEffect, useState } from 'react';
import { buildClientSchema, GraphQLSchema } from 'graphql';
import { DocumentationContext } from '../../context/documentationContext';
import RootView from './RootView/RootView';
import TypeView from './TypeView/TypeView';
import FieldView from './FieldView/FieldView';
import Loader from '../Loader/Loader';
import { INTROSPECTION_QUERY } from '../../constants/constants';
import classes from './documentation.module.scss';

import type { StackItem } from '../../types/documentationTypes';
const Documentation = () => {
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);
  const [stack, setStack] = useState<StackItem[]>([{ name: 'Documentation', view: 'root' }]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getSchema = async () => {
      try {
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    getSchema();
  }, []);

  const currentStackItem = stack.at(-1);
  let currentView = null;
  if (currentStackItem) {
    if (currentStackItem.view === 'root') currentView = <RootView />;
    if (currentStackItem.view === 'type') currentView = <TypeView viewProps={currentStackItem} />;
    if (currentStackItem.view === 'field') currentView = <FieldView viewProps={currentStackItem} />;
  }

  return (
    <DocumentationContext.Provider value={{ schema, setStack }}>
      <div className={classes.container}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {stack.length > 1 ? (
              <div>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setStack((current) => {
                      return current.filter((item, idx) => {
                        if (idx !== current.length - 1) return item;
                      });
                    });
                  }}
                >
                  <span>&lt; {stack.at(-2)?.name}</span>
                </a>
              </div>
            ) : null}
            {currentView}
          </>
        )}
      </div>
    </DocumentationContext.Provider>
  );
};

export default Documentation;
