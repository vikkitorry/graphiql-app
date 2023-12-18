import {
  getNamedType,
  isObjectType,
  isInputObjectType,
  GraphQLType,
  isEnumType,
  GraphQLSchema,
} from 'graphql';
import type { StackItem } from '../Schema';
import { getTypeString } from '../../../utils/getTypeString';

type TypeLinkProps = {
  type: GraphQLType;
  schema: GraphQLSchema;
  setStack: React.Dispatch<React.SetStateAction<StackItem[]>>;
};

const TypeLink = ({ type, schema, setStack }: TypeLinkProps) => {
  return (
    <a
      href="#"
      onClick={(e) => {
        const basicType = schema.getType(getNamedType(type).name);
        e.preventDefault();
        setStack((prev) => {
          return [
            ...prev,
            {
              name: getNamedType(type).name,
              view: 'type',
              fields:
                isObjectType(basicType) || isInputObjectType(basicType)
                  ? Object.values(basicType.getFields())
                  : null,
              description: getNamedType(type).description,
              enumValues: isEnumType(type)
                ? Object.values(type.getValues())
                : null,
            },
          ];
        });
      }}
    >
      {getTypeString(type)}
    </a>
  );
};

export default TypeLink;
