import React  from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import * as sessionActions from "../../store/session";
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';



function Navigation({ isLoaded }){

  const history = useHistory()
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const handleDemoLogin = () => {
    const credential =  'demo@user.io';
    const password = 'password';
    return dispatch(sessionActions.demoLogin({ credential, password }))
      .then(() => history.push('/home'))
  }


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        {/* <NavLink exact to="/home">Home</NavLink> */}
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div id='logged-out-nav-bar'>
        <div id='links-wrapper'>
          <button onClick={() => handleDemoLogin()}>Demo</button>
          <LoginFormModal />
          <NavLink to="/signup">Sign Up</NavLink>
        </div>
      </div>
    );
  }

  
  return (
    <div className='header'>
      <div className='nav-buttons'>
        <ul>
          <li>
            {/* <NavLink exact to="/home">Home</NavLink> */}
            {isLoaded && sessionLinks}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;

