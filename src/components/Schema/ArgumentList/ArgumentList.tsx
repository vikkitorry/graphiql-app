import type { ArgumentType } from '../../../types/schemaTypes';
import type { StackItem } from '../Schema';
import Argument from '../Argument/Argument';
import type { GraphQLSchema } from 'graphql';

type ArgumentListProps = {
  args: ReadonlyArray<ArgumentType>;
  schema: GraphQLSchema;
  setStack: React.Dispatch<React.SetStateAction<StackItem[]>>;
};
const ArgumentList = ({ args, schema, setStack }: ArgumentListProps) => {
  if (!args || args.length === 0) return null;
  if (args.length === 1)
    return (
      <>
        {'('}
        <span>
          <Argument arg={args[0]} setStack={setStack} schema={schema} />
        </span>
        {')'}
      </>
    );
  return (
    <>
      {'('}
      <ul>
        {args.map((arg) => {
          return (
            <li key={arg.name}>
              <Argument arg={arg} setStack={setStack} schema={schema} />
            </li>
          );
        })}
      </ul>

      {')'}
    </>
  );
};

export default ArgumentList;
