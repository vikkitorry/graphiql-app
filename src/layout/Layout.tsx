import { Outlet } from 'react-router-dom';
import classes from './layout.module.scss';
import Header from '../components/header/Header';
import Footer from '../components/Footer/Footer';
import { TranslatorContext } from '../context/translatorContextProvider';
import { translationData, translationErrorsData } from '../context/translationData/translationData';
import { useState } from 'react';
import { Language } from '../context/translatorContextProvider';

type LayoutProps = {
  userLoggedIn: boolean;
  setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Layout = ({ userLoggedIn, setUserLoggedIn }: LayoutProps) => {
  const [lang, setLang] = useState<Language>('en');
  return (
    <TranslatorContext.Provider
      value={{ lang, data: translationData, errorsData: translationErrorsData, setLang }}
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
