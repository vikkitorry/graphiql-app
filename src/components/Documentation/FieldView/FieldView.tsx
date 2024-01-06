import { useContext } from 'react';
import { TranslatorContext } from '../../../context/translatorContextProvider';
import { TbSquareLetterT, TbSquareLetterA } from 'react-icons/tb';
import TypeLink from '../TypeLink/TypeLink';
import SectionHeading from '../SectionHeading/SectionHeading';
import ArgumentList from '../ArgumentList/ArgumentList';
import type { ViewProps } from '../../../types/documentationTypes';

const FieldView = ({ viewProps }: ViewProps) => {
  const { lang, data } = useContext(TranslatorContext);
  const { name, description, args, type } = viewProps;

  return (
    <>
      <h4 data-testid="field-name">{name}</h4>
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
          <ArgumentList args={args} />
        </>
      ) : null}
    </>
  );
};

export default FieldView;
