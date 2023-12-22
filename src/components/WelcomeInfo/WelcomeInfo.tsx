import { useContext } from 'react';
import cls from './WelcomeInfo.module.scss';
import cat from '../../assets/cat.gif';
import cloudDark from '../../assets/cloudDark.svg';
import natasha from '../../assets/natasha.png';
import vika from '../../assets/vika.png';
import maxim from '../../assets/maxim.png';
import { Card } from 'antd';
import { TranslatorContext } from '../../context/translatorContextProvider';
import { cardsData } from './cardsData/cardsData';

const WelcomeInfo = () => {
  const { lang } = useContext(TranslatorContext);
  return (
    <div className={cls.container}>
      <div className={cls.cards}>
        <Card
          title={cardsData[lang].project.title}
          size={'small'}
          className={`${cls.card} ${cls.project}`}
        >
          <p>{cardsData[lang].project.data[0]}</p>
          <p>{cardsData[lang].project.data[1]}</p>
        </Card>
        <Card
          title={cardsData[lang].developers.title}
          size={'small'}
          className={`${cls.card} ${cls.dev}`}
        >
          <div className={cls.developer}>
            <img src={natasha} alt={cardsData[lang].developers.alt} />
            <p>{cardsData[lang].developers.name.natasha}</p>
          </div>
          <div className={cls.developer}>
            <img src={vika} alt={cardsData[lang].developers.alt} />
            <p>{cardsData[lang].developers.name.vika}</p>
          </div>
          <div className={cls.developer}>
            <img src={maxim} alt={cardsData[lang].developers.alt} />
            <p>{cardsData[lang].developers.name.maxim}</p>
          </div>
        </Card>
        <Card
          title={cardsData[lang].course.title}
          size={'small'}
          className={`${cls.card} ${cls.course}`}
        >
          <p>{cardsData[lang].course.data}</p>
        </Card>
      </div>
      <img src={cat} className={cls.cat} />
      <img src={cloudDark} className={cls.clouds}></img>
    </div>
  );
};

export default WelcomeInfo;
