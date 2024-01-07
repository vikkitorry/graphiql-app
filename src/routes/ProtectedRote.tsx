import { Navigate, Outlet, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children?: React.ReactNode;
  userLoggedIn: boolean;
  redirectPath?: string;
};

const ProtectedRoute = ({ children, userLoggedIn, redirectPath = '/' }: ProtectedRouteProps) => {
  const location = useLocation();

  if (userLoggedIn) {
    return <Navigate to={redirectPath} state={{ from: location }} />;
  }

  return <>{children ? children : <Outlet />}</>;
};

export default ProtectedRoute;
