import TypeLink from '../TypeLink/TypeLink';
import type { ArgumentType } from '../../../types/documentationTypes';

type ArgumentProps = {
  arg: ArgumentType;
};
const Argument = ({ arg }: ArgumentProps) => {
  return (
    <>
      {arg.name}:
      <TypeLink type={arg.type} />
    </>
  );
};

export default Argument;
