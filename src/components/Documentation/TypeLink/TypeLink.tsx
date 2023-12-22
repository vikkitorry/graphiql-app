import { useContext } from 'react';
import { getNamedType, isObjectType, isInputObjectType, GraphQLType, isEnumType } from 'graphql';
import { DocumentationContext } from '../../../context/documentationContext';
import { getTypeString } from '../../../utils/getTypeString';
import classes from './type-link.module.scss';

type TypeLinkProps = {
  type: GraphQLType;
};

const TypeLink = ({ type }: TypeLinkProps) => {
  const { schema, setStack } = useContext(DocumentationContext);

  return (
    <a
      href="#"
      className={classes.typeLink}
      onClick={(e) => {
        const basicType = schema!.getType(getNamedType(type).name);
        e.preventDefault();
        setStack((curr) => {
          return curr.at(-1)?.name === getNamedType(type).name
            ? curr
            : [
                ...curr,
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
