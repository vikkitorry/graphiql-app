import cls from './Footer.module.scss';
import RssIcon from '../../assets/RssIcon.svg';

const Footer = () => {
  return (
    <footer className={cls.footer}>
      <div className={cls.container}>
        <a href="https://github.com/kotokatu">Natasha !!ADD PICTURE</a>
        <a href="https://github.com/Kirich8">Maxim !!ADD PICTURE</a>
        <a href="https://github.com/vikkitorry">Vika !!ADD PICTURE</a>
      </div>
      <div>2024</div>
      <div>
        <a href="https://rs.school/react/">
          <img src={RssIcon} alt={'RSSshool icon'} width={70} height={60} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
