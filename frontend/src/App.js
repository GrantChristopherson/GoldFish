import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from 'react-router-dom';

import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import NoteBowlsList from './components/NoteBowls';
import NotesList from './components/NotesList';
import NoteText from './components/NoteText';




function App() {


  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);
  const noteBowlId = useSelector(state => state.notes.noteBowlId)

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  
  let sessionComponents;
  if (sessionUser) {
    sessionComponents = (
      <div>
        <Route path='/home'>
          <NoteBowlsList />
        </Route>
        <Route path={`/home/${noteBowlId}/notes`}>
          <NotesList />
        </Route>
        // <Route path=''>
          <NoteText />
        // </Route>
      </div>
    );
  } else {
    sessionComponents = (
      <div>
        <h2>Splash Page</h2>
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

