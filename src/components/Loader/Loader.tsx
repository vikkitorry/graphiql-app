import { BallTriangle } from 'react-loader-spinner';
import { Flex } from 'antd';
import classes from './loader.module.scss';

const Loader = () => {
  return (
    <Flex className={classes.spinnerContainer} align={'center'} justify={'center'}>
      <BallTriangle
        height={140}
        width={140}
        radius={5}
        color="#fcb864"
        ariaLabel="ball-triangle-loading"
        visible={true}
      />
    </Flex>
  );
};

export default Loader;
