import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import * as sessionActions from "../../store/session";
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';



function Navigation({ isLoaded }){

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const handleDemoLogin = () => {
    const credential =  'demo@user.io';
    const password = 'password';
    return dispatch(sessionActions.demoLogin({ credential, password }))
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        <NavLink exact to="/home">Home</NavLink>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <button onClick={() => handleDemoLogin()}>Demo</button>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  
  return (
    <div className='nav-bar'>
      <ul>
        <li>
          {/* <NavLink exact to="/home">Home</NavLink> */}
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </div>
  );
}

export default Navigation;

