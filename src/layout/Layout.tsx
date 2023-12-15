import { Outlet } from 'react-router-dom';
import classes from './layout.module.scss';
import Header from '../components/header/Header';
import Footer from '../components/Footer/Footer';
import { TranslatorContext } from '../context/translatorContextProvider';
import { translationData, translationErrorsData } from '../context/translationData/translationData';

type LayoutProps = {
  userLoggedIn: boolean;
  setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Layout = ({ userLoggedIn, setUserLoggedIn }: LayoutProps) => {
  return (
    <TranslatorContext.Provider
      value={{ lang: 'en', data: translationData, errorsData: translationErrorsData }}
    >
      <div className={classes.wrapper}>
        <Header userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
        <main className={classes.main}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </TranslatorContext.Provider>
  );
};

export default Layout;
