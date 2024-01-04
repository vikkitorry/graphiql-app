import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import cat from '../../assets/cat.gif';
import classes from './welcome-page.module.scss';
import WelcomeInfo from '../../components/WelcomeInfo/WelcomeInfo';
import { TranslatorContext } from '../../context/translatorContextProvider';
import { AppRoutes } from '../../routes/routeConfig/routeConfig';

type WelcomePageProps = {
  userLoggedIn: boolean;
};

const WelcomePage = ({ userLoggedIn }: WelcomePageProps) => {
  const { lang, data } = useContext(TranslatorContext);
  return (
    <section className={classes.container} data-testid="welcome-page">
      <h2>{data[lang].welcomePage}</h2>
      <WelcomeInfo />
      <div className={classes.links}>
        {userLoggedIn ? (
          <>
            <NavLink to={AppRoutes.GRAPHI_QL} className={classes.link}>
              {data[lang].goToGraphi}
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to={AppRoutes.SIGN_IN} className={classes.link}>
              {data[lang].signIn}
            </NavLink>
            <NavLink to={AppRoutes.SIGN_UP} className={`${classes.link} ${classes.linkColor}`}>
              {data[lang].signUp}
            </NavLink>
          </>
        )}
      </div>
      <img src={cat} className={classes.cat} />
    </section>
  );
};

export default WelcomePage;
