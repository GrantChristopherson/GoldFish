
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getNoteBowls, deleteNoteBowl } from '../../store/noteBowls';
import NoteBowlCreator from '../NoteBowlCreator';




const NoteBowlsList = () => {
  

  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);
  const usersNoteBowls = useSelector(state => state.noteBowls);

  const [showNoteBowlForm, setShowNoteBowlForm] = useState(false);

  useEffect(() => {
    dispatch(getNoteBowls(sessionUser.id))
  }, [dispatch, sessionUser.id])



  if (!usersNoteBowls) {
    return null;
  }

  const hideForm = () => setShowNoteBowlForm(false)




  return (
    <div className='noteBowls-list'>
      <h2>Notebowls</h2>
      <ul>
        {usersNoteBowls.list && usersNoteBowls.list.map(noteBowl => {
          return (
            <div  key={noteBowl.id} className='listed-noteBowl'>
              <li key={noteBowl.id}>
                <NavLink  to={`/home/${noteBowl.id}/notes`} 
                          key={noteBowl.id}>
                          {noteBowl.title}
                </NavLink>
              </li>
              <div>
              {!noteBowl.default && <button 
                onClick={async (e) => {
                  e.preventDefault();
              
                  await dispatch(deleteNoteBowl(noteBowl.id))
                }
              }
              > - </button>}
              </div>
            </div>
          )
        })}
      </ul>
      {!showNoteBowlForm && <button onClick={() => setShowNoteBowlForm(true)}> + </button>}
      {showNoteBowlForm && <NoteBowlCreator hideForm={hideForm} />}
    </div>
  );
};



export default NoteBowlsList;