import Documentation from '../../components/Documentation/Documentation';
import classes from './graphiql-page.module.scss';
const GraphiQLPage = () => {
  return (
    <div className={classes.container}>
      <h2>GraphiQL Page</h2>
      <Documentation />
    </div>
  );
};

export default GraphiQLPage;
