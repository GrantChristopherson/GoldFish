import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createNote } from '../../store/notes';



const NoteCreator = ({ hideNoteCreator, noteBowlId }) => {


  const dispatch = useDispatch();
  const sessionUserId = useSelector(state => state.session.user.id);
 
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId: sessionUserId,
      noteBowlId: noteBowlId,
      title,
      content
    };

    let addNote = await dispatch(createNote(payload));
    if (addNote) {
      hideNoteCreator();
    };
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    hideNoteCreator();
  };


  return (
    <div className='note-text'>
      <h2>New Note</h2>
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