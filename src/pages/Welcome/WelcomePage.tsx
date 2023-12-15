import { NavLink } from 'react-router-dom';
import classes from './welcome-page.module.scss';
import WelcomeInfo from '../../components/WelcomeInfo/WelcomeInfo';

type WelcomePageProps = {
  userLoggedIn: boolean;
};

const WelcomePage = ({ userLoggedIn }: WelcomePageProps) => {
  return (
    <div className={classes.container}>
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
    </div>
  );
};

export default WelcomePage;
