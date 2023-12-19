import TypeLink from '../TypeLink/TypeLink';
import FieldLink from '../FieldLink/FieldLink';
import ArgumentList from '../ArgumentList/ArgumentList';
import type { StackItem } from '../../../types/documentationTypes';

export type ViewProps = {
  viewProps: StackItem;
};

const TypeView = ({ viewProps }: ViewProps) => {
  const { name, description, fields, enumValues } = viewProps;
  return (
    <>
      <h1>{name}</h1>
      <p>{description}</p>
      {fields && fields.length ? (
        <>
          <p>Fields</p>
          <ul>
            {fields.map((field) => {
              const type = field.type;
              return (
                <li key={field.name}>
                  <div>
                    <FieldLink field={field} type={type} />
                    <ArgumentList args={field.args} />
                    :
                    <TypeLink type={type} />
                  </div>
                  <p>{field.description}</p>
                </li>
              );
            })}
          </ul>
        </>
      ) : null}
      {enumValues ? (
        <>
          <p>Enum Values</p>
          <ul>
            {enumValues.map((enumValue) => {
              return <li key={enumValue.name}>{enumValue.name}</li>;
            })}
          </ul>
        </>
      ) : null}
    </>
  );
};

export default TypeView;
