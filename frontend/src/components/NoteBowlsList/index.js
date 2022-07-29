
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { getNoteBowls, deleteNoteBowl } from '../../store/noteBowls';
import { getNoteBowlNotes } from '../../store/notes'
import NoteBowlCreator from '../NoteBowlCreator';
import NotesList from '../NotesList';



const NoteBowlsList = ({ setShowNoteList }) => {
  

  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);
  const usersNoteBowls = useSelector(state => state.noteBowls);

  const [noteBowlIdProp, setNoteBowlIdProp] = useState()
  const [showNoteBowlForm, setShowNoteBowlForm] = useState(false);
  const [showNoteAList, setShowNoteAList] = useState(false);
  const [showNoteCreator, setShowNoteCreator] = useState(false);
  const [currentNoteBowlId, setCurrentNoteBowlId] = useState()

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
                <h3 key={noteBowl.id} onClick={ async (e) => {
                  e.preventDefault();

                  setNoteBowlIdProp(noteBowl.id)
                  await dispatch(getNoteBowlNotes(noteBowl.id))
                  setShowNoteAList(true)
                  setCurrentNoteBowlId(noteBowl.id)
                }

                }
                >
                  {noteBowl.title}
                </h3>
              </li>
              <div>
              {!noteBowl.default && <button 
                onClick={ async (e) => {
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
      {showNoteBowlForm && <NoteBowlCreator hideForm={hideForm} noteBowlIdProp={noteBowlIdProp} />}
      {showNoteAList && (<NotesList noteBowlId = {currentNoteBowlId} showNoteCreator={showNoteCreator} setShowNoteCreator={setShowNoteCreator}/>)}
    </div>
  );
};



export default NoteBowlsList;