import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import { getNote } from '../../store/notes';




const NoteUpdater = ({ showNote, setShowNote, hideNoteUpdater, noteId }) => {

  const dispatch = useDispatch();
  const note = useSelector(state => state.notes[noteId])
  console.log('noteId=================', noteId)
  console.log('note===================',note)
  
  const [title, setTitle] = useState(note.title);   
  const [content, setContent] = useState(note.content);
  
  useEffect(() => {
    
  },[dispatch, note])
  if (!note) return null


  const handleSubmit = async (e) => {
    e.preventDefault();



    hideNoteUpdater()
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    hideNoteUpdater();
  };



  return (
    <div>
      <h2>Note: {note.title}</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            name='title'
          />
          <textarea
            type='text'
            onChange={(e) => setContent(e.target.value)}
            value={content}
            name='content'
          >  
          </textarea>
        </form>
        <button type='submit'>Submit</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </div>
    </div>
  );
}



export default NoteUpdater;