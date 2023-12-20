import TypeLink from '../TypeLink/TypeLink';
import type { ArgumentType } from '../../../types/documentationTypes';
import classes from './argument.module.scss';

type ArgumentProps = {
  arg: ArgumentType;
};
const Argument = ({ arg }: ArgumentProps) => {
  return (
    <>
      <span className={classes.argument}>{arg.name}: </span>
      <TypeLink type={arg.type} />
    </>
  );
};

export default Argument;
