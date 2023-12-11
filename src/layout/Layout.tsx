import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';

type LayoutProps = {
  userLoggedIn: boolean;
  setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Layout = ({ userLoggedIn, setUserLoggedIn }: LayoutProps) => {
  return (
    <div className="wrapper">
      <Header userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
      <main>
        <Outlet />
      </main>
      <footer>2024</footer>
    </div>
  );
};

export default Layout;
