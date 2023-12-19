import { useContext } from 'react';
import { getNamedType, isObjectType, isInputObjectType, GraphQLType, isEnumType } from 'graphql';
import { DocumentationContext } from '../../../context/documentationContext';
import { getTypeString } from '../../../utils/getTypeString';

type TypeLinkProps = {
  type: GraphQLType;
};

const TypeLink = ({ type }: TypeLinkProps) => {
  const { schema, setStack } = useContext(DocumentationContext);

  return (
    <a
      href="#"
      onClick={(e) => {
        const basicType = schema!.getType(getNamedType(type).name);
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
              enumValues: isEnumType(type) ? Object.values(type.getValues()) : null,
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
