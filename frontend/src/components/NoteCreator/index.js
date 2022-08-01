import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createNote } from '../../store/notes';
import './noteCreator.css';



const NoteCreator = ({ hideNoteCreator, noteBowlId }) => {


  const dispatch = useDispatch();
  const sessionUserId = useSelector(state => state.session.user.id);
 
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId: sessionUserId,
      noteBowlId: noteBowlId,
      title,
      content
    };
    setErrors([]);
    let err = []
    if (!title.length || title.length > 30) err.push('Title must be at least 1 character but no more than 50 characters')
    if (!content) err.push('Add at least something... (1 character minimum)');
    if (content > 500) err.push('Note can not be more than 500 characters');
    setErrors([...err])
    if (!errors.length) {
      hideNoteCreator();
      return await dispatch(createNote(payload));
    } else {
      return errors
    }
  };

    
    
  const handleCancelClick = (e) => {
    e.preventDefault();
    hideNoteCreator();
  };


  return (
    <div className='note-text'>
      <h2>New Note</h2>
      <form onSubmit={handleSubmit}>
          <button id='submit-cancel' type='submit'>Submit</button>
          <button id='submit-cancel' type="button" onClick={handleCancelClick}>Cancel</button>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
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
      </form>
    </div>
  );
};



export default NoteCreator;
    
