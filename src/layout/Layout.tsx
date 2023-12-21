import { Outlet } from 'react-router-dom';
import classes from './layout.module.scss';
import Header from '../components/header/Header';
import Footer from '../components/Footer/Footer';
import { TranslatorContext } from '../context/translatorContextProvider';
import { translationData } from '../context/translationData/translationData';
import { useState } from 'react';
import { Language } from '../context/translatorContextProvider';
import Loader from '../components/Loader/Loader';

type LayoutProps = {
  userLoggedIn: boolean;
  setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
};

const Layout = (props: LayoutProps) => {
  const { userLoggedIn, setUserLoggedIn, isLoading } = props;
  const [lang, setLang] = useState<Language>('en');

  return !isLoading ? (
    <TranslatorContext.Provider value={{ lang, data: translationData, setLang }}>
      <div className={classes.wrapper}>
        <Header userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
        <main className={classes.main}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </TranslatorContext.Provider>
  ) : (
    <div className={classes.wrapper}>
      <Loader />
    </div>
  );
};

export default Layout;
