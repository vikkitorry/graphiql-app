import { NavLink } from 'react-router-dom';
import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import classes from './header.module.scss';
import Service from '../../app/service/service';
import { TranslatorContext } from '../../context/translatorContextProvider';
import { AppRoutes } from '../../routes/routeConfig/routeConfig';
import { Flex, Switch } from 'antd';
import logo from '../../assets/GraphiQL.png';

type HeaderProps = {
  userLoggedIn: boolean;
  setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ userLoggedIn, setUserLoggedIn }: HeaderProps) => {
  const { lang, data, setLang } = useContext(TranslatorContext);
  const [scrollPosition, setScrollPosition] = useState(0);
  const header = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    window.addEventListener('scroll', () => setScrollPosition(window.scrollY));
  }, []);

  useEffect(() => {
    scrollPosition > 0
      ? header.current?.classList.add(classes.sticky)
      : header.current?.classList.remove(classes.sticky);
  }, [scrollPosition]);

  const logout = async () => {
    await Service.signOut();
    setUserLoggedIn(false);
  };

  const changeLang = () => {
    if (setLang) {
      lang === 'ru' ? setLang('en') : setLang('ru');
    }
  };

  return (
    <header ref={header} className={classes.header}>
      <Flex gap={'middle'} align={'center'} className={classes.logobox}>
        <NavLink to={AppRoutes.MAIN} className={classes.logo}>
          <img src={logo} alt="logo" />
        </NavLink>

        <Switch
          data-testid="switch"
          checked={lang === 'ru'}
          checkedChildren="RU"
          unCheckedChildren="EN"
          onChange={changeLang}
        />
      </Flex>

      <Flex gap={'middle'} justify={'center'} className={classes.mainLink}>
        <NavLink to={'/'}>{data[lang].welcome}</NavLink>
      </Flex>

      <Flex className={classes.authLinks}>
        {userLoggedIn ? (
          <Flex gap={'middle'} justify={'center'}>
            <NavLink to={AppRoutes.GRAPHI_QL}>{data[lang].mainPage}</NavLink>
            <NavLink to={AppRoutes.MAIN} onClick={logout}>
              {data[lang].signOut}
            </NavLink>
          </Flex>
        ) : (
          <Flex gap={'middle'} justify={'center'}>
            <NavLink to={AppRoutes.SIGN_IN}>{data[lang].signIn}</NavLink>
            <NavLink to={AppRoutes.SIGN_UP}>{data[lang].signUp}</NavLink>
          </Flex>
        )}
      </Flex>
    </header>
  );
};

export default Header;
