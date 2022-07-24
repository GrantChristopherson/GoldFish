import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

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
      <h2>Notebowls</h2>
      <ul>
        {usersNoteBowls.map((noteBowl, i) => {
          return (
            <div className='listed-noteBowl'>
              <li key={i}>{noteBowl}</li>
              <div>
                <button> v </button>
                <button> - </button>
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