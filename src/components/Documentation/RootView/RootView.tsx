import { useContext } from 'react';
import { DocumentationContext } from '../../../context/documentationContext';
import TypeLink from '../TypeLink/TypeLink';
import SectionHeading from '../SectionHeading/SectionHeading';
import { TbSquareLetterR, TbSquareLetterT } from 'react-icons/tb';
import classes from './root-view.module.scss';

const RootView = () => {
  const { schema } = useContext(DocumentationContext);
  const rootQuery = schema?.getQueryType();
  const mutationQuery = schema?.getMutationType();

  return (
    <>
      <h5>Documentation</h5>
      {schema && (
        <>
          <SectionHeading content="Root Types" icon={<TbSquareLetterR />} />

          {rootQuery ? (
            <p>
              <span className={classes.field}>query: </span>
              <TypeLink type={rootQuery} />
            </p>
          ) : null}

          {mutationQuery ? (
            <p>
              <span className={classes.field}>mutation: </span>
              <TypeLink type={mutationQuery} />
            </p>
          ) : null}

          <SectionHeading content="Types" icon={<TbSquareLetterT />} />

          {Object.values(schema.getTypeMap())
            .filter((type) => !type.name.startsWith('__') && type !== rootQuery)
            .map((type) => {
              return (
                <li key={type.name}>
                  <TypeLink type={type} />
                </li>
              );
            })}
        </>
      )}
    </>
  );
};

export default RootView;
