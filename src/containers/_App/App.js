import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { ROUTES } from 'CONSTS/routes';

import { SizeContext } from 'UTILS/contexts';
import { useResponsiveBreakpoints } from 'UTILS/useResponsiveBreakpoints';

import { PageLoader } from 'COMPONENTS/common/Loaders/Loader/PageLoader';
import { Toast } from 'COMPONENTS/common/Toast';
import { Header } from 'COMPONENTS/Header';
import { ProtectedRoute } from 'CONTAINERS/_App/components/ProtactedRoute/ProtectedRoute';
import { useAuth } from 'CONTAINERS/_App/helpers/useAuth';

import styles from './App.scss';

const Main = lazy(() => import('CONTAINERS/Main/Main'));
const Login = lazy(() => import('CONTAINERS/Auth/Login'));
const Registration = lazy(() => import('CONTAINERS/Auth/Registration'));
const Transactions = lazy(() => import('CONTAINERS/Transactions/Transactions'));
const Exchanges = lazy(() => import('CONTAINERS/Exchanges/Exchanges'));
const MonthsPage = lazy(() => import('CONTAINERS/MonthsPage/MonthsPage'));
const MonthCategoryStats = lazy(() => import('CONTAINERS/MonthCategoryStats/MonthCategoryStats'));
const Add = lazy(() => import('CONTAINERS/Add/Add'));
const AddExchange = lazy(() => import('CONTAINERS/AddExchange/AddExchange'));
const Cards = lazy(() => import('CONTAINERS/Cards/Cards'));
const NotFound = lazy(() => import('CONTAINERS/NotFound/NotFound'));

function App() {
  const { loadingAuth } = useAuth();
  const size = useResponsiveBreakpoints({
    mobile: 600,
    tablet: 1000,
    smallDesktop: 1200,
    desktop: 10000,
  });

  if (loadingAuth) {
    return <PageLoader />;
  }

  return (
    <SizeContext.Provider value={{ size }}>
      <div className={styles.app}>
        <Toast />
        <Header />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<ProtectedRoute isForGuest />}>
              <Route path={ROUTES.LOGIN} exact element={<Login />} />
              <Route path={ROUTES.REGISTRATION} exact element={<Registration />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route index exact element={<Main />} />
              <Route path={ROUTES.EXCHANGES} exact element={<Exchanges />} />
              <Route path={ROUTES.TRANSACTIONS} exact element={<Transactions />} />
              <Route path={ROUTES.MONTHS} exact element={<MonthsPage />} />
              <Route path={ROUTES.STATS} exact element={<MonthCategoryStats />} />
              <Route path={ROUTES.ADD_INCOME} exact element={<Add isIncome />} />
              <Route path={ROUTES.ADD_EXPEND} exact element={<Add />} />
              <Route path={ROUTES.EXCHANGE} exact element={<AddExchange />} />
              <Route path={ROUTES.CARDS} exact element={<Cards />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </SizeContext.Provider>
  );
}

export default App;
