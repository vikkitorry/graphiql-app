import { useContext } from 'react';
import { TranslatorContext } from '../../../context/translatorContextProvider';
import TypeLink from '../TypeLink/TypeLink';
import SectionHeading from '../SectionHeading/SectionHeading';
import { TbSquareLetterT, TbSquareLetterA } from 'react-icons/tb';
import type { ViewProps } from '../TypeView/TypeView';
import classes from './field-view.module.scss';

const FieldView = ({ viewProps }: ViewProps) => {
  const { lang, data } = useContext(TranslatorContext);

  const { name, description, args, type } = viewProps;
  return (
    <>
      <h4>{name}</h4>
      {description ? <p>{description}</p> : null}
      {type ? (
        <>
          <SectionHeading content={data[lang].type} icon={<TbSquareLetterT />} />
          <TypeLink type={type} />
        </>
      ) : null}
      {args?.length ? (
        <>
          <SectionHeading content={data[lang].arguments} icon={<TbSquareLetterA />} />
          <ul>
            {args.map((arg) => {
              return (
                <li key={arg.name} className={classes.argument}>
                  <span>{arg.name}: </span>
                  <TypeLink type={arg.type} />
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
