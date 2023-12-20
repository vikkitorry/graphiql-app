import { useContext } from 'react';
import { DocumentationContext } from '../../../context/documentationContext';
import EmptyView from '../EmptyView/EmptyView';
import TypeLink from '../TypeLink/TypeLink';
import SectionHeading from '../SectionHeading/SectionHeading';
import { TbSquareLetterR, TbSquareLetterT } from 'react-icons/tb';
import classes from './root-view.module.scss';

const RootView = () => {
  const { schema } = useContext(DocumentationContext);
  const rootQuery = schema?.getQueryType();
  const mutationQuery = schema?.getMutationType();
  const subscriptionQuery = schema?.getSubscriptionType();

  return (
    <>
      <h5>Documentation</h5>
      {schema ? (
        <>
          <SectionHeading content="Root Types" icon={<TbSquareLetterR />} />
          <p>
            {rootQuery ? (
              <>
                <span className={classes.field}>query: </span>
                <TypeLink type={rootQuery} />
              </>
            ) : null}
          </p>
          {mutationQuery ? <p>{`mutation: ${mutationQuery?.name}`}</p> : null}
          {subscriptionQuery ? <p>{`subscription: ${subscriptionQuery?.name}`}</p> : null}
          <SectionHeading content="All Types" icon={<TbSquareLetterT />} />
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
      ) : (
        <EmptyView />
      )}
    </>
  );
};

export default RootView;
