import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from 'react-router-dom';

import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import NoteBowlsList from './components/NoteBowls';
import NotesList from './components/NotesList';



function App() {


  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);

  const [isLoaded, setIsLoaded] = useState(false);
  const [showNoteList, setShowNoteList] = useState(false);
  const [showNote, setShowNote] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  
  let sessionComponents;
  if (sessionUser) {
    sessionComponents = (
      <div>
        <Route path='/home'>
          <NoteBowlsList setShowNoteList={setShowNoteList}/>
          {showNoteList && <NotesList showNote={showNote} setShowNote={setShowNote}/>}
        </Route>
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

