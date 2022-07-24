import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getNoteBowls } from '../../store/noteBowls';




const NoteBowlsList = () => {
  
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);
  const usersNoteBowls = useSelector(state => state.noteBowls.list);

  useEffect(() => {
    dispatch(getNoteBowls(sessionUser.id))
  }, [dispatch, sessionUser])

  if (!usersNoteBowls) {
    return null;
  }



  return (
    <div className='noteBowls-list'>
      {console.log('usersNoteBowls-------------', usersNoteBowls)}
      {/* {console.log('noteBowl-------------', noteBowl)} */}
      <h2>Notebowls</h2>
      <ul>
        {usersNoteBowls && usersNoteBowls.map(noteBowl => {
          return (
            <div  key={noteBowl.id} className='listed-noteBowl'>
              <li key={noteBowl.id}>
                <NavLink  to={`/noteBowls/${noteBowl.userId}/notes`} 
                          key={noteBowl.id}
                          >{noteBowl.title}</NavLink></li>
              <div>
                <button> v </button>
                {!noteBowl.default && <button> - </button>}
              </div>
            </div>
          )
        })}
      </ul>
      <button> + </button>
    </div>
  );
};



export default NoteBowlsList;