import { GraphQLType, isListType, isNonNullType, getNamedType } from 'graphql';

export const getTypeString = (type: GraphQLType): string => {
  if (isNonNullType(type)) return `${getTypeString(type.ofType)}!`;
  if (isListType(type)) return `[${getTypeString(type.ofType)}]`;
  else return getNamedType(type).name;
};
