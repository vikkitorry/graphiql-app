import cls from './WelcomeInfo.module.scss';
import cloudDark from '../../assets/cloudDark.svg';
import { Card } from 'antd';

const WelcomeInfo = () => {
  return (
    <section className={cls.container}>
      <h2 className={cls.tittle}>Welcome Page</h2>
      <div className={cls.welcomeInfo}>
        <Card title="Developers" size={'small'} className={`${cls.card} ${cls.one}`} hoverable />
        <Card title="Project" size={'small'} className={`${cls.card} ${cls.two}`} hoverable />
        <Card title="Course" size={'small'} className={`${cls.card} ${cls.three}`} hoverable />
        <img src={cloudDark} className={cls.clouds} />
      </div>
    </section>
  );
};

export default WelcomeInfo;
