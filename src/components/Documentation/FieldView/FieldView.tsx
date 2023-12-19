import TypeLink from '../TypeLink/TypeLink';
import type { ViewProps } from '../TypeView/TypeView';
const FieldView = ({ viewProps }: ViewProps) => {
  const { name, description, args, type } = viewProps;
  return (
    <>
      <p>{name}</p>
      {description ? <p>{description}</p> : null}
      {type ? (
        <>
          <p>Type</p>
          <TypeLink type={type} />
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
