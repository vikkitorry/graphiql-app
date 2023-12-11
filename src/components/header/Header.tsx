import { NavLink } from 'react-router-dom';

type HeaderProps = {
  userLoggedIn: boolean;
  setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ userLoggedIn, setUserLoggedIn }: HeaderProps) => {
  return (
    <header>
      <div className="logobox">
        <div className="logo">
          <img src="./favicon.png" alt="logo" />
        </div>
        <h1 className="title">GraphiQL</h1>
      </div>
      <nav className="navigation">
        <NavLink to={'/'}>Main</NavLink>
        {userLoggedIn && (
          <NavLink to={'/'} onClick={() => setUserLoggedIn(false)}>
            Logout
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
