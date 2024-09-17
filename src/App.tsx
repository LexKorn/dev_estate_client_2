import { useEffect, useContext } from 'react';
import {BrowserRouter} from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import AppRouter from "./components/AppRouter";
import Header from './components/Header/Header';
import { Context } from '.';
import {check} from './http/usersAPI';


const App = observer(() => {
  const {user} = useContext(Context);

  useEffect(() => {
    check()
      .then(() => user.setIsAuth(true))
      .catch(err => console.log(err))
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
