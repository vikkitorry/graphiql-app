import { Flex, Input } from 'antd';
import FunctionalEditor from '../../components/FunctionalEditor/FunctionalEditor';
import classes from './graphi-ql-page.module.scss';
import ConfigEditor from '../../components/ConfigEditor/ConfigEditor';

const GraphiQLPage = () => {
  return (
    <Flex className={classes.content}>
      <Input placeholder="Enter the API endpoint" className={classes.request} />

      <Flex className={classes.body}>
        <Flex className={classes.settings}>
          <FunctionalEditor />
          <ConfigEditor />
        </Flex>

        <Flex className={classes.result}>
          <div></div>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default GraphiQLPage;
