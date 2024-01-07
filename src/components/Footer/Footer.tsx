import cls from './Footer.module.scss';
import RssIcon from '../../assets/RssIcon.svg';
import GithubIcon from '../../assets/githubIcon.svg';

const Footer = () => {
  return (
    <footer className={cls.footer}>
      <div className={cls.links}>
        <a href="https://github.com/kotokatu">
          <img src={GithubIcon} alt={'RSSshool icon'} />
        </a>
        <a href="https://github.com/Kirich8">
          <img src={GithubIcon} alt={'RSSshool icon'} />
        </a>
        <a href="https://github.com/vikkitorry">
          <img src={GithubIcon} alt={'RSSshool icon'} />
        </a>
      </div>
      <div className={cls.year}>2024</div>
      <div className={cls.rsschool}>
        <a href="https://rs.school/react/">
          <img src={RssIcon} alt={'RSSshool icon'} width={70} height={60} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
