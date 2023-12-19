import { useEffect, useState } from 'react';
import { buildClientSchema, GraphQLSchema } from 'graphql';
import { DocumentationContext } from '../../context/documentationContext';
import RootView from './RootView/RootView';
import TypeView from './TypeView/TypeView';
import FieldView from './FieldView/FieldView';
import classes from './documentation.module.scss';
import { INTROSPECTION_QUERY } from '../../constants/constants';

import type { StackItem } from '../../types/documentationTypes';
const Documentation = () => {
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);
  const [stack, setStack] = useState<StackItem[]>([{ name: 'Documentation', view: 'root' }]);

  useEffect(() => {
    const getSchema = async () => {
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
      console.log(data);
      setSchema(buildClientSchema(data));
    };

    getSchema();
  }, []);

  const currentStackItem = stack.at(-1);
  let currentView;
  if (schema && currentStackItem) {
    if (currentStackItem.view === 'root') currentView = <RootView />;
    if (currentStackItem.view === 'type') currentView = <TypeView viewProps={currentStackItem} />;
    if (currentStackItem.view === 'field') currentView = <FieldView viewProps={currentStackItem} />;
  }

  return (
    <DocumentationContext.Provider value={{ schema, setStack }}>
      <div className={classes.container}>
        {currentStackItem?.view !== 'root' ? (
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
      </div>
    </DocumentationContext.Provider>
  );
};

export default Documentation;
