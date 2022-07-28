
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteNote } from '../../store/notes';
import NoteCreator from '../NoteCreator';



const NotesList = ({ showNote, setShowNote }) => {

  const dispatch = useDispatch();
  const noteBowlsNotes = useSelector(state => state.notes.notesList);
  const noteBowlId = useSelector(state => state.notes.noteBowlId);
  
  useEffect(() => {
  },[noteBowlsNotes])

  const hideNote = () => setShowNote(false)

  if (!noteBowlsNotes) {
    return null;
  }


  return (
    <div className='notes-list'>
      <h2>Notes</h2>
      <ul>
        {noteBowlsNotes && noteBowlsNotes.map(note => {
          return (
            <div key={note.id} className='listed-note'>
              <li key={note.id}>
                <h3 key={note.id}>
                    {note.title}
                </h3>
              </li>
              <div>
              {note.id && <button 
                onClick={ async (e) => {
                  e.preventDefault();
              
                  await dispatch(deleteNote(note.id))
                }
                }
                > - </button>}
              </div>
            </div>
          )
        })}
      </ul>
      {!showNote && <button onClick={() => setShowNote(true)}> + </button>}
      {showNote && <NoteCreator noteBowlId={noteBowlId} hideNote={hideNote}/>}
    </div>
  );
};



export default NotesList;
                            
                          
