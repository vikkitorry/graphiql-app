import TypeLink from '../TypeLink/TypeLink';
import FieldLink from '../FieldLink/FieldLink';
import ArgumentList from '../ArgumentList/ArgumentList';
import type { StackItem } from '../../../types/documentationTypes';
import SectionHeading from '../SectionHeading/SectionHeading';
import { TbSquareLetterF, TbSquareLetterE } from 'react-icons/tb';
import classes from './type-view.module.scss';

export type ViewProps = {
  viewProps: StackItem;
};

const TypeView = ({ viewProps }: ViewProps) => {
  const { name, description, fields, enumValues } = viewProps;
  return (
    <>
      <h4>{name}</h4>
      {description ? <p className={classes.description}>{description}</p> : null}
      {fields && fields.length ? (
        <>
          <SectionHeading content="Fields" icon={<TbSquareLetterF />} />
          <ul>
            {fields.map((field) => {
              const type = field.type;
              return (
                <li key={field.name}>
                  <div>
                    <FieldLink field={field} type={type} />
                    <ArgumentList args={field.args} />: <TypeLink type={type} />
                  </div>
                  <p className={classes.description}>{field.description}</p>
                </li>
              );
            })}
          </ul>
        </>
      ) : null}
      {enumValues ? (
        <>
          <SectionHeading content="Enum Values" icon={<TbSquareLetterE />} />
          <ul>
            {enumValues.map((enumValue) => {
              return (
                <li key={enumValue.name} className={classes.enumValue}>
                  {enumValue.name}
                </li>
              );
            })}
          </ul>
        </>
      ) : null}
    </>
  );
};

export default TypeView;
