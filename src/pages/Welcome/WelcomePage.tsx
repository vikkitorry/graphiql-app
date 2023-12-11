import { NavLink } from 'react-router-dom';

type WelcomePageProps = {
  userLoggedIn: boolean;
};

const WelcomePage = ({ userLoggedIn }: WelcomePageProps) => {
  return (
    <div className="welcome">
      <h2>Welcome</h2>

      {userLoggedIn ? (
        <>
          <NavLink to={'/graphi-ql'}>GraphiQL</NavLink>
        </>
      ) : (
        <>
          <NavLink to={'/sign-in'}>Sign In</NavLink>
          <NavLink to={'/sign-up'}>Sign Up</NavLink>
        </>
      )}
    </div>
  );
};

export default WelcomePage;
