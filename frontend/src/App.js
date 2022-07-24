import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Route, Switch } from 'react-router-dom';

import { useSelector } from 'react-redux';

import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GoldFishBrowser from './components/GoldFishBrowser';



function App() {


  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  
  let sessionComponents;
  if (sessionUser) {
    sessionComponents = (
      <GoldFishBrowser user={sessionUser} />
    );
  } else {
    sessionComponents = (
      <div>
        <h2>Nothing to see until login</h2>
      </div>
    )
  }


  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
      {isLoaded && sessionComponents}
    </>
  );
};



export default App;
