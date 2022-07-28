import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createNote } from '../../store/notes';



const NoteCreator = ({ hideNote }) => {


  const dispatch = useDispatch();
  const sessionUserId = useSelector(state => state.session.user.id);
  const noteS = useSelector(state => state.notes.notesList[0].noteBowlId)

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  if (!noteS) return null
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId: sessionUserId,
      noteBowlId: noteS,
      title,
      content
    };

    let addNote = await dispatch(createNote(payload));
    if (addNote) {
      hideNote();
    };
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    hideNote();
  };


  return (
    <div className='note-text'>
      <h2>Note</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Title'
          value={title}
          name='title'
        />
        <textarea
          type='text'
          onChange={(e) => setContent(e.target.value)}
          placeholder='add to your note...'
          value={content}
          name='content'
        >
        </textarea>
        <button type='submit'>Submit</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </div>
  );
};



export default NoteCreator;