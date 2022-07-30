import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import * as sessionActions from '../../store/session';
import './LoginForm.css';



function LoginFormPage() {

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  // auth me has this conditional but not the one below the handle submit
  // if (sessionUser) {
  //   history.push('/home');
  // }


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  if (sessionUser) {
    history.push('/home');
  }


  return (
    <div>
      <form className="logInForm" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};



export default LoginFormPage;