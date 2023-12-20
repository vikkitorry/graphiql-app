import { useContext } from 'react';
import { DocumentationContext } from '../../../context/documentationContext';
import EmptyView from '../EmptyView/EmptyView';
import TypeLink from '../TypeLink/TypeLink';

const RootView = () => {
  const { schema } = useContext(DocumentationContext);
  const rootQuery = schema?.getQueryType();
  const mutationQuery = schema?.getMutationType();
  const subscriptionQuery = schema?.getSubscriptionType();

  return (
    <>
      <h3>Documentation</h3>
      {schema ? (
        <>
          <p>Root Types</p>
          <p>
            {rootQuery ? (
              <>
                <span>query: </span>
                <TypeLink type={rootQuery} />
              </>
            ) : null}
          </p>
          {mutationQuery ? <p>{`mutation: ${mutationQuery?.name}`}</p> : null}
          {subscriptionQuery ? <p>{`subscription: ${subscriptionQuery?.name}`}</p> : null}
          <p>All Schema Types</p>
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
