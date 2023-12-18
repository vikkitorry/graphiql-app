import { ViewProps } from '../TypeView/TypeView';
import TypeLink from '../TypeLink/TypeLink';
const FieldView = ({ viewProps, schema, setStack }: ViewProps) => {
  const { name, description, args, type } = viewProps;
  return (
    <>
      <p>{name}</p>
      {description ? <p>{description}</p> : null}
      {type ? (
        <>
          <p>Type</p>
          <TypeLink type={type} setStack={setStack} schema={schema} />
        </>
      ) : null}
      {args?.length ? (
        <>
          <p>Arguments</p>
          <ul>
            {args.map((arg) => {
              return (
                <li key={arg.name}>
                  {arg.name}:
                  <TypeLink
                    type={arg.type}
                    setStack={setStack}
                    schema={schema}
                  />
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
