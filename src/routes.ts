import { MAIN_ROUTE, MORTGAGE_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, ACCOUNT_ROUTE } from './utils/consts';
import { AuthPage, AccountPage, MainPage, MortgagePage } from './pages';

export const routes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: MORTGAGE_ROUTE,
        Component: MortgagePage
    },
    {
        path: LOGIN_ROUTE,
        Component: AuthPage
    },
    {
        path: REGISTER_ROUTE,
        Component: AuthPage
    },
    {
        path: ACCOUNT_ROUTE,
        Component: AccountPage
    }
];