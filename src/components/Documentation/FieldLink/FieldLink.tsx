import { GraphQLType } from 'graphql';
import { useContext } from 'react';
import { DocumentationContext } from '../../../context/documentationContext';
import type { FieldType } from '../../../types/documentationTypes';

type FieldLinkProps = {
  field: FieldType;
  type: GraphQLType;
};

const FieldLink = ({ field, type }: FieldLinkProps) => {
  const { setStack } = useContext(DocumentationContext);
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        setStack((prev) => {
          return [
            ...prev,
            {
              name: field.name,
              view: 'field',
              args: field.args,
              description: field.description,
              type,
            },
          ];
        });
      }}
    >
      {field.name}
    </a>
  );
};

export default FieldLink;
