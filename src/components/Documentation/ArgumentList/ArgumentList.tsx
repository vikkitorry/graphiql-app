import Argument from '../Argument/Argument';
import type { ArgumentType } from '../../../types/documentationTypes';
import classes from './argument-list.module.scss';

type ArgumentListProps = {
  args: ReadonlyArray<ArgumentType>;
};
const ArgumentList = ({ args }: ArgumentListProps) => {
  if (!args || args.length === 0) return null;
  return (
    <>
      {args.length === 1 ? (
        <Argument arg={args[0]} />
      ) : (
        <ul>
          {args.map((arg) => {
            return (
              <li key={arg.name} className={classes.argumentItem}>
                <Argument arg={arg} />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default ArgumentList;
