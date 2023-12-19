import { useContext } from 'react';
import { DocumentationContext } from '../../../context/documentationContext';
import EmptyView from '../EmptyView/EmptyView';
import TypeLink from '../TypeLink/TypeLink';

const RootView = () => {
  const { schema } = useContext(DocumentationContext);
  const rootQuery = schema?.getQueryType();
  const mutationQuery = schema?.getMutationType();
  const subscriptionQuery = schema?.getSubscriptionType();

  return schema ? (
    <>
      <p>Documentation</p>
      <p>Root Types</p>
      <p>
        {rootQuery ? (
          <>
            <span>query: </span>
            <TypeLink type={rootQuery} />
          </>
        ) : null}
      </p>
      <p>{mutationQuery ? `mutation: ${mutationQuery?.name}` : null}</p>
      <p>{subscriptionQuery ? `subscription: ${subscriptionQuery?.name}` : null}</p>
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
  );
};

export default RootView;
