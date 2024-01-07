import { useState, useContext, useRef, lazy, Suspense, useLayoutEffect, useEffect } from 'react';
import { DocumentationContext } from '../../context/documentationContext';
import { TranslatorContext } from '../../context/translatorContextProvider';
import { Skeleton } from 'antd';
import type { StackItem, DocumentationProps } from '../../types/documentationTypes';
import classes from './documentation.module.scss';

const RootView = lazy(() => import('./RootView/RootView'));
const FieldView = lazy(() => import('./FieldView/FieldView'));
const TypeView = lazy(() => import('./TypeView/TypeView'));

const Documentation = ({ schema }: DocumentationProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { lang, data } = useContext(TranslatorContext);
  const [stack, setStack] = useState<StackItem[]>([{ name: '', view: 'root' }]);

  const currentStackItem = stack.at(-1);
  let currentView = null;
  if (currentStackItem?.view === 'root') currentView = <RootView />;
  if (currentStackItem?.view === 'type') currentView = <TypeView viewProps={currentStackItem} />;
  if (currentStackItem?.view === 'field') currentView = <FieldView viewProps={currentStackItem} />;

  useLayoutEffect(() => {
    if (ref.current) ref.current.scrollTop = 0;
  }, [stack]);

  useEffect(() => {
    setStack([{ name: '', view: 'root' }]);
  }, [schema]);

  return (
    <DocumentationContext.Provider value={{ schema, setStack }}>
      <div ref={ref} className={classes.container} data-testid="documentation">
        {stack.length > 1 ? (
          <h5>
            <a
              className={classes.navigationLink}
              href="#"
              data-testid="documentation-navlink"
              onClick={(e) => {
                e.preventDefault();
                setStack((current) => current.slice(0, -1));
              }}
            >
              <span>&lt;</span>
              <span>
                {stack.at(-2)?.view === 'root' ? data[lang].documentation : stack.at(-2)?.name}
              </span>
            </a>
          </h5>
        ) : null}
        <Suspense fallback={<Skeleton data-testid="skeleton" />}>{currentView}</Suspense>
      </div>
    </DocumentationContext.Provider>
  );
};

export default Documentation;
