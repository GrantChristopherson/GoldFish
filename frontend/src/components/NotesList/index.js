
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import NoteText from '../NoteText';



const NotesList = ({ showNote, setShowNote }) => {

 
  const noteBowlsNotes = useSelector(state => state.notes.notesList);
  
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
                <button> - </button>
              </div>
            </div>
          )
        })}
      </ul>
      {!showNote && <button onClick={() => setShowNote(true)}> + </button>}
      {showNote && <NoteText hideNote={hideNote}/>}
    </div>
  );
};



export default NotesList;
                            
                          
