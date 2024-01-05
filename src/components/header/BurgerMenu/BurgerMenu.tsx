import { Button, Drawer, Flex } from 'antd';
import { useContext, useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { TranslatorContext } from '../../../context/translatorContextProvider';
import { AppRoutes } from '../../../routes/routeConfig/routeConfig';
import classes from '../header.module.scss';

type BurgerMenuProps = {
  userLoggedIn: boolean;
  logout: () => void;
};

const BurgerMenu = ({ userLoggedIn, logout }: BurgerMenuProps) => {
  const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
  const { lang, data } = useContext(TranslatorContext);

  const showBurgerMenu = () => {
    setOpenBurgerMenu(true);
  };

  const closeBurgerMenu = () => {
    setOpenBurgerMenu(false);
  };

  return (
    <>
      <Button
        className={classes.burgerButton}
        onClick={showBurgerMenu}
        icon={<MenuOutlined className={classes.burgerIcon} />}
      />

      <Drawer
        placement="right"
        width="318px"
        onClose={closeBurgerMenu}
        open={openBurgerMenu}
        styles={{ body: { backgroundColor: '#c8e3ec' }, header: { backgroundColor: '#c8e3ec' } }}
        zIndex={1002}
      >
        <Flex className={classes.burgerMenu}>
          <NavLink to={'/'}>{data[lang].welcome}</NavLink>

          {userLoggedIn ? (
            <>
              <NavLink to={AppRoutes.GRAPHI_QL}>{data[lang].mainPage}</NavLink>
              <NavLink to={AppRoutes.MAIN} onClick={logout}>
                {data[lang].signOut}
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to={AppRoutes.SIGN_IN}>{data[lang].signIn}</NavLink>
              <NavLink to={AppRoutes.SIGN_UP}>{data[lang].signUp}</NavLink>
            </>
          )}
        </Flex>
      </Drawer>
    </>
  );
};

export default BurgerMenu;
