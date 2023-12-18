import type { StackItem } from '../Schema';
import { GraphQLSchema } from 'graphql';
import TypeLink from '../TypeLink/TypeLink';
import FieldLink from '../FieldLink/FieldLink';
import ArgumentList from '../ArgumentList/ArgumentList';

export type ViewProps = {
  viewProps: StackItem;
  schema: GraphQLSchema;
  setStack: React.Dispatch<React.SetStateAction<StackItem[]>>;
};

const TypeView = ({ viewProps, schema, setStack }: ViewProps) => {
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
                    <FieldLink field={field} type={type} setStack={setStack} />
                    <ArgumentList
                      args={field.args}
                      setStack={setStack}
                      schema={schema}
                    />
                    :
                    <TypeLink type={type} setStack={setStack} schema={schema} />
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
