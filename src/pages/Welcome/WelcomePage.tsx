import { NavLink } from 'react-router-dom';
import classes from './welcome-page.module.scss';

type WelcomePageProps = {
  userLoggedIn: boolean;
};

const WelcomePage = ({ userLoggedIn }: WelcomePageProps) => {
  return (
    <div className={classes.container}>
      <h2>Welcome Page</h2>

      <div className={classes.links}>
        {userLoggedIn ? (
          <>
            <NavLink to={'/graphi-ql'}>GraphiQL</NavLink>
          </>
        ) : (
          <>
            <NavLink to={'/sign-in'}>Sign In</NavLink>
            <NavLink to={'/sign-up'}>Sign Up</NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default WelcomePage;
