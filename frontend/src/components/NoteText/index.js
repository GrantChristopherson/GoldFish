import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createNote } from '../../store/notes';



const NoteText = ({ hideNote }) => {


  const dispatch = useDispatch();
  const sessionUserId = useSelector(state => state.session.user.id);
  const noteBowlId = useSelector(state => state.noteBowls.id)

  const [noteTitle, setNoteTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId: sessionUserId,
      noteBowlId: noteBowlId,
      noteTitle,
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
          onChange={(e) => setNoteTitle(e.target.value)}
          placeholder='Title'
          value={noteTitle}
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



export default NoteText;