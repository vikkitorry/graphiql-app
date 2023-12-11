import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../layout/Layout';
import WelcomePage from '../pages/Welcome/WelcomePage';
import NotFoundPage from '../pages/NotFound/NotFoundPage';
import SignInPage from '../pages/SignIn/SignInPage';
import SignUpPage from '../pages/SignUp/SignUpPage';
import GraphiQLPage from '../pages/GraphiQL/GraphiQLPage';
import ProtectedRoute from '../routes/ProtectedRote';

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(true);

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />}
      >
        <Route index element={<WelcomePage userLoggedIn={userLoggedIn} />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />

        <Route element={<ProtectedRoute userLoggedIn={!userLoggedIn} redirectPath="/" />}>
          <Route path="/graphi-ql" element={<GraphiQLPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
