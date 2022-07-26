import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import { getNoteBowlNotes } from '../../store/notes'



const NotesList = () => {

  const { id } = useParams();

  const dispatch = useDispatch();
  const noteBowlsNotes = useSelector(state => state.notes.list);

  // const [showNoteForm, setShowNoteForm] = useState(false);

  useEffect(() => {
    dispatch(getNoteBowlNotes(id))
  }, [dispatch, id])

  return (
    <div className='notes-list'>
      <h2>Notes</h2>
      <ul>
        {noteBowlsNotes.list && noteBowlsNotes.list.map(note => {
          return (
            <div key={note.id} className='listed=note'>
              <li key={note.id}>
                <NavLink  to={`/home/${id}/notes/${note.id}`}
                          key={note.id}>
                          {note.title}
                </NavLink>
              </li>
              <div>
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



export default NotesList;
                            
