import { useContext } from 'react';
import { TranslatorContext } from '../../../context/translatorContextProvider';
import { TbSquareLetterF, TbSquareLetterE } from 'react-icons/tb';
import FieldLink from '../FieldLink/FieldLink';
import ArgumentList from '../ArgumentList/ArgumentList';
import TypeLink from '../TypeLink/TypeLink';
import SectionHeading from '../SectionHeading/SectionHeading';
import type { ViewProps } from '../../../types/documentationTypes';
import classes from './type-view.module.scss';

const TypeView = ({ viewProps }: ViewProps) => {
  const { lang, data } = useContext(TranslatorContext);
  const { name, description, fields, enumValues } = viewProps;

  return (
    <>
      <h4 data-testid="type-name">{name}</h4>
      {description ? <p className={classes.description}>{description}</p> : null}
      {fields && fields.length ? (
        <>
          <SectionHeading content={data[lang].fields} icon={<TbSquareLetterF />} />
          <ul>
            {fields.map((field) => {
              const type = field.type;
              return (
                <li key={field.name}>
                  <div>
                    <FieldLink field={field} type={type} />
                    {field.args.length ? (
                      <>
                        <span>{'('}</span>
                        <ArgumentList args={field.args} />
                        <span>{')'}</span>
                      </>
                    ) : null}
                    <span>: </span>
                    <TypeLink type={type} />
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
          <SectionHeading content={data[lang].enumValues} icon={<TbSquareLetterE />} />
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
