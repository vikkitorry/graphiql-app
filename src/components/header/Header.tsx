import { NavLink } from 'react-router-dom';
import classes from './header.module.scss';
import Service from '../../app/service/service';

type HeaderProps = {
  userLoggedIn: boolean;
  setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ userLoggedIn, setUserLoggedIn }: HeaderProps) => {
  const logout = async () => {
    try {
      await Service.signOut();
      setUserLoggedIn(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className={classes.header}>
      <div className={classes.logobox}>
        <div className={classes.logo}>
          <img src="./favicon.png" alt="logo" />
        </div>
        <h1>GraphiQL</h1>
      </div>

      <div className={classes.mainLink}>
        <NavLink className={classes.link} to={'/'}>
          Main
        </NavLink>
      </div>

      <div className={classes.logoutLink}>
        {userLoggedIn && (
          <NavLink to={'/'} onClick={logout}>
            Logout
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
