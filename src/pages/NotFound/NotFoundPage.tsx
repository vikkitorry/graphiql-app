import img from '../../assets/404.jpg';
import cls from './not-found-page.module.scss';

const NotFoundPage = () => {
  return (
    <div className={cls.notFound}>
      Page not found
      <p>404</p>
      <img src={img} className={cls.img} />
    </div>
  );
};

export default NotFoundPage;
