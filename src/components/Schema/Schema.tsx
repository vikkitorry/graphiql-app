import { useEffect, useState } from 'react';
import {
  buildClientSchema,
  GraphQLSchema,
  GraphQLArgument,
  GraphQLType,
  GraphQLEnumValue,
} from 'graphql';
import { FieldType } from '../../types/schemaTypes';
import { INTROSPECTION_QUERY } from '../../constants/constants';
import RootView from './RootView/RootView';
import TypeView from './TypeView/TypeView';
import FieldView from './FieldView/FieldView';
import EmptyView from './EmptyView/EmptyView';

export type StackItem = {
  name: string;
  view: 'root' | 'type' | 'field';
  description?: string | null;
  args?: ReadonlyArray<GraphQLArgument>;
  fields?: FieldType[] | null;
  type?: GraphQLType;
  enumValues?: GraphQLEnumValue[] | null;
};
const DocsComponent = () => {
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);
  const [stack, setStack] = useState<StackItem[]>([
    { name: 'Docs', view: 'root' },
  ]);

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
    if (currentStackItem.view === 'root')
      currentView = <RootView schema={schema} setStack={setStack} />;
    if (currentStackItem.view === 'type')
      currentView = (
        <TypeView
          viewProps={currentStackItem}
          setStack={setStack}
          schema={schema}
        />
      );
    if (currentStackItem.view === 'field')
      currentView = (
        <FieldView
          viewProps={currentStackItem}
          setStack={setStack}
          schema={schema}
        />
      );
  } else {
    currentView = <EmptyView />;
  }

  return (
    <>
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
          {stack.at(-2)?.name}
        </a>
      </div>
      {currentView}
    </>
  );
};

export default DocsComponent;
