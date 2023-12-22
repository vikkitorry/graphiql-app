import { useState, lazy, Suspense } from 'react';
import { DocumentationContext } from '../../context/documentationContext';
import Loader from '../Loader/Loader';
import type { StackItem } from '../../types/documentationTypes';
import classes from './documentation.module.scss';
import { GraphQLSchema } from 'graphql';

const RootView = lazy(() => import('./RootView/RootView'));
const FieldView = lazy(() => import('./FieldView/FieldView'));
const TypeView = lazy(() => import('./TypeView/TypeView'));

type DocumentationViewProps = {
  schema: GraphQLSchema;
};
const DocumentationView = ({ schema }: DocumentationViewProps) => {
  const [stack, setStack] = useState<StackItem[]>([{ name: 'Documentation', view: 'root' }]);
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
        {stack.length > 1 ? (
          <h5>
            <a
              className={classes.navigationLink}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setStack((current) => current.slice(0, -1));
              }}
            >
              <span>&lt;</span>
              <span>{stack.at(-2)?.name}</span>
            </a>
          </h5>
        ) : null}
        <Suspense fallback={<Loader />}>{currentView}</Suspense>
      </div>
    </DocumentationContext.Provider>
  );
};

export default DocumentationView;
