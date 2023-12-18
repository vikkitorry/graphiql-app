import { ArgumentType } from '../../../types/schemaTypes';
import TypeLink from '../TypeLink/TypeLink';
import { StackItem } from '../Schema';
import type { GraphQLSchema } from 'graphql';

type ArgumentProps = {
  arg: ArgumentType;
  schema: GraphQLSchema;
  setStack: React.Dispatch<React.SetStateAction<StackItem[]>>;
};
const Argument = ({ arg, schema, setStack }: ArgumentProps) => {
  return (
    <>
      {arg.name}:
      <TypeLink type={arg.type} setStack={setStack} schema={schema} />
    </>
  );
};

export default Argument;
