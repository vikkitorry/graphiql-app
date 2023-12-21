import { NavLink } from 'react-router-dom';
import classes from './welcome-page.module.scss';
import WelcomeInfo from '../../components/WelcomeInfo/WelcomeInfo';

type WelcomePageProps = {
  userLoggedIn: boolean;
};

const WelcomePage = ({ userLoggedIn }: WelcomePageProps) => {
  return (
    <section className={classes.container}>
      <h2>Welcome Page</h2>
      <WelcomeInfo />
      <div className={classes.links}>
        {userLoggedIn ? (
          <>
            <NavLink to={'/graphi-ql'} className={classes.link}>
              Go To GraphiQL
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to={'/sign-in'} className={classes.link}>
              Sign In
            </NavLink>
            <NavLink to={'/sign-up'} className={classes.link}>
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </section>
  );
};

export default WelcomePage;
