import { useContext } from 'react';
import { TranslatorContext } from '../../../context/translatorContextProvider';
import { DocumentationContext } from '../../../context/documentationContext';
import TypeLink from '../TypeLink/TypeLink';
import SectionHeading from '../SectionHeading/SectionHeading';
import { TbSquareLetterR, TbSquareLetterT } from 'react-icons/tb';
import classes from './root-view.module.scss';

const RootView = () => {
  const { schema } = useContext(DocumentationContext);
  const { lang, data } = useContext(TranslatorContext);

  const rootQuery = schema?.getQueryType();
  const mutationQuery = schema?.getMutationType();
  const subscriptionQuery = schema?.getSubscriptionType();

  return (
    <>
      {schema && (
        <>
          <SectionHeading content={data[lang].rootTypes} icon={<TbSquareLetterR />} />

          {rootQuery ? (
            <p>
              <span className={classes.field}>query: </span>
              <TypeLink type={rootQuery} />
            </p>
          ) : null}

          {mutationQuery ? (
            <p>
              <span className={classes.field}>mutation: </span>
              <TypeLink type={mutationQuery} />
            </p>
          ) : null}

          {subscriptionQuery ? (
            <p>
              <span className={classes.field}>mutation: </span>
              <TypeLink type={subscriptionQuery} />
            </p>
          ) : null}

          <SectionHeading content={data[lang].types} icon={<TbSquareLetterT />} />

          {Object.values(schema.getTypeMap())
            .filter((type) => !type.name.startsWith('__') && type !== rootQuery)
            .map((type) => {
              return (
                <li key={type.name}>
                  <TypeLink type={type} />
                </li>
              );
            })}
        </>
      )}
    </>
  );
};

export default RootView;
