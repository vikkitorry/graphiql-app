import { Outlet } from 'react-router-dom';
import classes from './layout.module.scss';
import Header from '../components/header/Header';

type LayoutProps = {
  userLoggedIn: boolean;
  setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Layout = ({ userLoggedIn, setUserLoggedIn }: LayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <Header userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
      <main className={classes.main}>
        <Outlet />
      </main>
      <footer className={classes.footer}>2024</footer>
    </div>
  );
};

export default Layout;
