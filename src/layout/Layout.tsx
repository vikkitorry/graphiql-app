import { Outlet } from 'react-router-dom';
import classes from './layout.module.scss';
import Header from '../components/header/Header';
import Footer from '../components/Footer/Footer';
import { TranslatorContext } from '../context/translatorContextProvider';
import { translationData, translationErrorsData } from '../context/translationData/translationData';
import { useState } from 'react';
import { Language } from '../context/translatorContextProvider';
import { BallTriangle } from 'react-loader-spinner';
import { Flex } from 'antd';

type LayoutProps = {
  userLoggedIn: boolean;
  setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
};

const Layout = (props: LayoutProps) => {
  const { userLoggedIn, setUserLoggedIn, isLoading } = props;
  const [lang, setLang] = useState<Language>('en');

  return !isLoading ? (
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
  ) : (
    <Flex className={classes.spinnerContainer} align={'center'} justify={'center'}>
      <BallTriangle
        height={140}
        width={140}
        radius={5}
        color="#c8e3ec"
        ariaLabel="ball-triangle-loading"
        visible={true}
      />
    </Flex>
  );
};

export default Layout;
