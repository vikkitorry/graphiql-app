import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import classes from './welcome-page.module.scss';
import WelcomeInfo from '../../components/WelcomeInfo/WelcomeInfo';
import { TranslatorContext } from '../../context/translatorContextProvider';

type WelcomePageProps = {
  userLoggedIn: boolean;
};

const WelcomePage = ({ userLoggedIn }: WelcomePageProps) => {
  const { lang, data } = useContext(TranslatorContext);
  return (
    <section className={classes.container}>
      <h2>{data[lang].welcomePage}</h2>
      <WelcomeInfo />
      <div className={classes.links}>
        {userLoggedIn ? (
          <>
            <NavLink to={'/graphi-ql'} className={classes.link}>
              {data[lang].goToGraphi}
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to={'/sign-in'} className={classes.link}>
              {data[lang].signIn}
            </NavLink>
            <NavLink to={'/sign-up'} className={`${classes.link} ${classes.linkColor}`}>
              {data[lang].signUp}
            </NavLink>
          </>
        )}
      </div>
    </section>
  );
};

export default WelcomePage;
