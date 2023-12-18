import { GraphQLType, isListType, isNonNullType, getNamedType } from 'graphql';

//TODO: рекурсия!
export const getTypeString = (type: GraphQLType) => {
  if (isNonNullType(type) && isListType(type.ofType))
    return `[${getNamedType(type).name}!]!`;
  if (isListType(type) && isNonNullType(type.ofType))
    return `[${getNamedType(type).name}]!`;
  else if (isNonNullType(type)) return `${getNamedType(type).name}!`;
  else if (isListType(type)) return `[${getNamedType(type).name}]`;
  else return getNamedType(type).name;
};
