import React, {useEffect} from 'react';
import {AppRouter} from "./providers/router";
import {Navbar} from "widgets/Navbar";
import {useDispatch} from "react-redux";
import {AppDispatch} from "./providers/storeProvider";
import {userActions} from "../entities/User";
import {USER_LOCALSTORAGE_KEY} from "../shared/const/localStorage";

function App() {
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(userActions.initAuthData())
    }, [dispatch]);
  return (
      <div>
          <Navbar/>
          <AppRouter/>
      </div>

  );
}

export default App;
