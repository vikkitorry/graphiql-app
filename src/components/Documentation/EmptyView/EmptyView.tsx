import { Empty } from 'antd';
import classes from './empty-view.module.scss';

const EmptyView = () => {
  return (
    <div className={classes.container}>
      <Empty>GraphQL Schema could not be loaded. Please check the link to the API.</Empty>;
    </div>
  );
};

export default EmptyView;
