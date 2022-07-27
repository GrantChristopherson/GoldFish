// import { useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


// import { getNoteBowlNotes } from '../../store/notes'



const NotesList = () => {

 
 
  const noteBowlsNotes = useSelector(state => state.notes.notesList);
  
  useEffect(() => {
    console.log('noteBowlsNotes---------', noteBowlsNotes)

  },[noteBowlsNotes])


  // if (!noteBowlsNotes) {
  //   return null;
  // }

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
      <button> + </button>
    </div>
  );
};



export default NotesList;
                            
                          
