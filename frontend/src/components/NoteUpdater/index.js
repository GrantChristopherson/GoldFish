import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateNote } from '../../store/notes';




const NoteUpdater = ({ hideNoteUpdater, noteId }) => {

  const dispatch = useDispatch();
  const note = useSelector(state => state.notes[noteId])

 
  const [title, setTitle] = useState(note.title);   
  const [content, setContent] = useState(note.content);
  const [errors, setErrors] = useState([]);
  
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content)
    }
  },[noteId])

  if (!note) return null

  const handleChange = async (e) => {
    e.preventDefault();
    
    const payload = {
      id: note.id,
      userId: note.userId,
      noteBowlId: note.noteBowlId,
      title: title,
      content: content
    };
    
    setErrors([]);
    let err = []
    if (!title.length || title.length > 30) err.push('Title must be at least 1 character but no more than 50 characters')
    if (!content) err.push('Add at least something... (1 character minimum)');
    if (content > 500) err.push('Note can not be more than 500 characters');
    setErrors([...err])
    if (!errors.length) {
      return await dispatch(updateNote(payload));
      hideNoteUpdater();
    } else {
      return errors;
    }
  };


  return (
    <div>
      <h2>Note: {note.title}</h2>
      <div>
        <form onChange={handleChange}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
            <input
              type='text'
              onChange={ (e) => setTitle(e.target.value)}
              value={title}
              name='title'
            />
            <textarea
              type='text'
              onChange={ (e) => setContent(e.target.value)}
              value={content}
              name='content'
            >  
            </textarea>
        </form>
        <button onClick={() => hideNoteUpdater()}>Close</button>
      </div>
    </div>
  );
}



export default NoteUpdater;