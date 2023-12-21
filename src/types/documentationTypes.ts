import { GraphQLArgument, GraphQLType, GraphQLInputType, GraphQLEnumValue } from 'graphql';

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

export type StackItem = {
  name: string;
  view: 'root' | 'type' | 'field';
  description?: string | null;
  args?: ReadonlyArray<GraphQLArgument>;
  fields?: FieldType[] | null;
  type?: GraphQLType;
  enumValues?: GraphQLEnumValue[] | null;
};
