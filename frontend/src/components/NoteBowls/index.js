import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getNoteBowls } from '../../store/noteBowls';
import NoteBowlCreator from '../NoteBowlCreator';




const NoteBowlsList = () => {
  
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);
  const usersNoteBowls = useSelector(state => state.noteBowls.list);

  const [showNoteBowlForm, setShowNoteBowlForm] = useState(false);

  useEffect(() => {
    dispatch(getNoteBowls(sessionUser.id))
  }, [dispatch, sessionUser])

  if (!usersNoteBowls) {
    return null;
  }



  return (
    <div className='noteBowls-list'>
      <h2>Notebowls</h2>
      <ul>
        {usersNoteBowls && usersNoteBowls.map(noteBowl => {
          return (
            <div  key={noteBowl.id} className='listed-noteBowl'>
              <li key={noteBowl.id}>
                <NavLink  to={`/home/${noteBowl.id}/notes`} 
                          key={noteBowl.id}
                          >{noteBowl.title}</NavLink></li>
              <div>
                {!noteBowl.default && <button> - </button>}
              </div>
            </div>
          )
        })}
      </ul>
      <button onClick={() => setShowNoteBowlForm(true)}> + </button>
      {showNoteBowlForm && <NoteBowlCreator />}
    </div>
  );
};



export default NoteBowlsList;