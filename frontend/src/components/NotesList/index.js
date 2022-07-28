
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteNote, getNoteBowlNotes } from '../../store/notes';
import NoteCreator from '../NoteCreator';
import NoteUpdater from '../NoteUpdater';



const NotesList = ({ showNoteCreator, setShowNoteCreator }) => {

  const dispatch = useDispatch();
  const noteBowlsNotes = useSelector(state => state.notes.notesList);
  const noteBowlId = useSelector(state => state.notes.noteBowlId);

  
  const [showNote, setShowNote] = useState(false);
  
  useEffect(() => {
  },[noteBowlsNotes])

  const hideNoteCreator = () => setShowNoteCreator(false)

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
                <h3 key={note.id} onClick={ async (e) => {
                  e.preventDefault();

                  // await dispatch(getNote(note.id))
                  setShowNote(true)
                }}>
                  <div>
                    {showNote && <NoteUpdater showNote={showNote} setShowNote={setShowNote} noteId={note.id}/>}
                  </div>
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
      {!showNoteCreator && <button onClick={() => setShowNoteCreator(true)}> + </button>}
      {showNoteCreator && <NoteCreator noteBowlId={noteBowlId} hideNoteCreator={hideNoteCreator}/>}
      {/* <div>
      {showNote && <NoteUpdater showNote={showNote} setShowNote={setShowNote}/>}
      </div> */}
    </div>
  );
};



export default NotesList;
                            
                          
