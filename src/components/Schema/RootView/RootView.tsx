import { GraphQLSchema } from 'graphql';
import type { StackItem } from '../Schema';
type RootViewProps = {
  schema: GraphQLSchema;
  setStack: React.Dispatch<React.SetStateAction<StackItem[]>>;
};
import TypeLink from '../TypeLink/TypeLink';

const RootView = ({ schema, setStack }: RootViewProps) => {
  const rootQuery = schema.getQueryType();
  const mutationQuery = schema.getMutationType();
  const subscriptionQuery = schema.getSubscriptionType();
  return (
    <>
      <p>Docs</p>
      <p>Root Types</p>
      <p>
        {rootQuery ? (
          <>
            <span>query: </span>
            <TypeLink type={rootQuery} setStack={setStack} schema={schema} />
          </>
        ) : null}
      </p>
      <p>{mutationQuery ? `mutation: ${mutationQuery?.name}` : null}</p>
      <p>
        {subscriptionQuery ? `subscription: ${subscriptionQuery?.name}` : null}
      </p>
      <p>All Schema Types</p>
      {Object.values(schema.getTypeMap())
        .filter((type) => !type.name.startsWith('__') && type !== rootQuery)
        .map((type) => {
          return (
            <li key={type.name}>
              <TypeLink type={type} setStack={setStack} schema={schema} />
            </li>
          );
        })}
    </>
  );
};

export default RootView;
