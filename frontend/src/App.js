import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from 'react-router-dom';

import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import NoteBowlsList from './components/NoteBowlsList';



function App() {


  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);

  const [isLoaded, setIsLoaded] = useState(false);
  const [showNoteList, setShowNoteList] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  
  let sessionComponents;
  if (sessionUser) {
    sessionComponents = (
      <div>
        <Route path='/home'>
          <NoteBowlsList setShowNoteList={setShowNoteList}/>
        </Route>
      </div>
    );
  } else {
    sessionComponents = (
      <div id='body'>
        <div id='title-wrapper'>
          <h1 id='welcome'>GoldFish</h1>
          <h3 id='mindless'>memory for the mindless</h3>
        </div>
      </div>
    )
  }

          
  
  
  return (
    <div id='header'>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
      {isLoaded && sessionComponents}
    </div>
  );
  };
  
  
  
  export default App;

