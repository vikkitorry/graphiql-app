import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../layout/Layout';
import WelcomePage from '../pages/Welcome/WelcomePage';
import NotFoundPage from '../pages/NotFound/NotFoundPage';
import SignInPage from '../pages/SignIn/SignInPage';
import SignUpPage from '../pages/SignUp/SignUpPage';
import GraphiQLPage from '../pages/GraphiQL/GraphiQLPage';
import ProtectedRoute from '../routes/ProtectedRote';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './service/service';
import { AppRoutes } from '../routes/routeConfig/routeConfig';

const App = () => {
  const [user, loading] = useAuthState(auth);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    if (!loading) {
      setUserLoggedIn(Boolean(user));
    }
  }, [loading, user]);

  return (
    <Routes>
      <Route
        path={AppRoutes.MAIN}
        element={<Layout userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />}
      >
        <Route index element={<WelcomePage userLoggedIn={userLoggedIn} />} />
        <Route element={<ProtectedRoute userLoggedIn={userLoggedIn} />}>
          <Route path={AppRoutes.SIGN_IN} element={<SignInPage />} />
        </Route>
        <Route element={<ProtectedRoute userLoggedIn={userLoggedIn} />}>
          <Route path={AppRoutes.SIGN_UP} element={<SignUpPage />} />
        </Route>
        <Route element={<ProtectedRoute userLoggedIn={!userLoggedIn} />}>
          <Route path={AppRoutes.GRAPHI_QL} element={<GraphiQLPage />} />
        </Route>
      </Route>
      <Route path={AppRoutes.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
