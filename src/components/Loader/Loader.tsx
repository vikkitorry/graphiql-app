import { Triangle } from 'react-loader-spinner';
import { Flex } from 'antd';
import classes from './loader.module.scss';

const Loader = () => {
  return (
    <Flex className={classes.spinnerContainer} align={'center'} justify={'center'}>
      <Triangle
        height="140"
        width="140"
        color="black"
        ariaLabel="triangle-loading"
        visible={true}
      />
    </Flex>
  );
};

export default Loader;
