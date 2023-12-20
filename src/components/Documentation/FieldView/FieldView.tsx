import TypeLink from '../TypeLink/TypeLink';
import type { ViewProps } from '../TypeView/TypeView';
import SectionHeading from '../SectionHeading/SectionHeading';
import { TbSquareLetterT, TbSquareLetterA } from 'react-icons/tb';
import classes from './field-view.module.scss';

const FieldView = ({ viewProps }: ViewProps) => {
  const { name, description, args, type } = viewProps;
  return (
    <>
      <h4>{name}</h4>
      {description ? <p>{description}</p> : null}
      {type ? (
        <>
          <SectionHeading content="Type" icon={<TbSquareLetterT />} />
          <TypeLink type={type} />
        </>
      ) : null}
      {args?.length ? (
        <>
          <SectionHeading content="Arguments" icon={<TbSquareLetterA />} />
          <ul>
            {args.map((arg) => {
              return (
                <li key={arg.name} className={classes.argument}>
                  {arg.name}: <TypeLink type={arg.type} />
                </li>
              );
            })}
          </ul>
        </>
      ) : null}
    </>
  );
};

export default FieldView;
