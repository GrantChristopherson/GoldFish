
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteNote } from '../../store/notes';
import NoteCreator from '../NoteCreator';
import NoteUpdater from '../NoteUpdater';
import './notesList.css';



const NotesList = ({ showNoteCreator, setShowNoteCreator, noteBowlId,  }) => {
 
  const dispatch = useDispatch();
  const noteBowlsNotes = useSelector(state => state.notes.notesList);
  
  const [showNote, setShowNote] = useState(false);
  const [noteId, setNoteId] = useState();

  useEffect(() => {
  },[noteBowlsNotes])

  const hideNoteCreator = () => setShowNoteCreator(false);
  const hideNoteUpdater = () => setShowNote(false);

  if (!noteBowlsNotes) {
    return null;
  }


  return (
    <div className='notes-list'>
      <div>
        <h2>Notes</h2>
        <ul>
          {noteBowlsNotes && noteBowlsNotes.map(note => {
            return (
              <div key={note.id} className='listed-note'>
                <li key={note.id}>
                  <h3 key={note.id} onClick={ async (e) => {
                    e.preventDefault();
                    setNoteId(note.id)
                    setShowNote(true)
                  }}>
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
                > -- </button>}
                </div>
              </div>
            )
          })}
        </ul>
        {!showNoteCreator && <button onClick={() => setShowNoteCreator(true)}> + </button>}
        {showNoteCreator && <NoteCreator noteBowlId={noteBowlId} hideNoteCreator={hideNoteCreator}/>}
        <div>
          {showNote && <NoteUpdater 
            showNote={showNote} 
            setShowNote={setShowNote}
            noteId={noteId}
            hideNoteUpdater={hideNoteUpdater}/>}
        </div>
      </div>
    </div>
  );
};



export default NotesList;
                            
                          
