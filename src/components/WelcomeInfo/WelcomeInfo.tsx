import cls from './WelcomeInfo.module.scss';
import cloudDark from '../../assets/cloudDark.svg';
import natasha from '../../assets/natasha.png';
import vika from '../../assets/vika.png';
import maxim from '../../assets/maxim.png';
import { Card } from 'antd';

const WelcomeInfo = () => {
  return (
    <div className={cls.container}>
      <div className={cls.cards}>
        <Card title="Project" size={'small'} className={`${cls.card} ${cls.project}`} hoverable>
          <p>This project is a clone of the famous tool - GraphiQL.</p>
          <p>GraphiQL is a playground / IDE for graphQL requests...</p>
        </Card>
        <Card title="Developers" size={'small'} className={`${cls.card} ${cls.dev}`} hoverable>
          <div className={cls.developer}>
            <img src={natasha} alt="developer photo" />
            <p>Natasha</p>
          </div>
          <div className={cls.developer}>
            <img src={vika} alt="developer photo" />
            <p>Viktoriia</p>
          </div>
          <div className={cls.developer}>
            <img src={maxim} alt="developer photo" />
            <p>Maxim</p>
          </div>
        </Card>
        <Card title="Course" size={'small'} className={`${cls.card} ${cls.course}`} hoverable>
          <p>
            RS School is free-of-charge and community-based education program conducted by The
            Rolling Scopes developer...
          </p>
        </Card>
      </div>
      <img src={cloudDark} className={cls.clouds} />
    </div>
  );
};

export default WelcomeInfo;
