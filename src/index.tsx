import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import CalcStore from './store/CalcStore';
import FilterStore from './store/FilterStore';
import AccountStore from './store/AccountStore';
import UserStore from './store/UserStore';

import './styles/style.sass';

type RootStateContextValue = {
  calc: CalcStore;
  filter: FilterStore;
  account: AccountStore;
  user: UserStore;
}

export const Context = createContext<RootStateContextValue>({} as RootStateContextValue);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Context.Provider value={{
    calc: new CalcStore(),
    filter: new FilterStore(),
    account: new AccountStore(),
    user: new UserStore()
  }}>
    <App />
  </Context.Provider>
);