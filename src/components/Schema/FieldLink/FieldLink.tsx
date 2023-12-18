import { GraphQLType } from 'graphql';
import type { StackItem } from '../Schema';
import { FieldType } from '../../../types/schemaTypes';

type FieldLinkProps = {
  field: FieldType;
  type: GraphQLType;
  setStack: React.Dispatch<React.SetStateAction<StackItem[]>>;
};

const FieldLink = ({ field, type, setStack }: FieldLinkProps) => {
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
