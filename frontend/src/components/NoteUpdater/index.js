import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateNote } from '../../store/notes';




const NoteUpdater = ({ hideNoteUpdater, noteId }) => {

  const dispatch = useDispatch();
  const note = useSelector(state => state.notes[noteId])

  
  const [title, setTitle] = useState(note.title);   
  const [content, setContent] = useState(note.content);
  
  useEffect(() => {
  },[dispatch, note])
  
  if (!note) return null

  console.log('noteId=================', noteId)
  console.log('note===================', note)
  console.log('title===================', title)
  console.log('content===================', content)


  const handleChange = async (e) => {
    e.preventDefault();
    
    const payload = {
      id: note.id,
      userId: note.userId,
      noteBowlId: note.noteBowlId,
      title: title,
      content: content
    };

    let updatedNote = await dispatch(updateNote(payload));
    if (updatedNote) {
      console.log('updatedNote===================', updatedNote)
      // hideNoteUpdater()
    };
  };


  return (
    <div>
      <h2>Note: {note.title}</h2>
      <div>
        <form onChange={handleChange}>
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
        <button onClick={() => hideNoteUpdater()}>Close</button>
      </div>
    </div>
  );
}



export default NoteUpdater;