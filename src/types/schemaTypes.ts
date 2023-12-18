import { GraphQLArgument, GraphQLType, GraphQLInputType } from 'graphql';

export type FieldType = {
  name: string;
  description: string | undefined | null;
  args: ReadonlyArray<GraphQLArgument>;
  type: GraphQLType | GraphQLInputType;
};

export type ArgumentType = {
  name: string;
  type: GraphQLInputType;
};
