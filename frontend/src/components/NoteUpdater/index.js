import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import { getNote } from '../../store/notes';




const NoteUpdater = ({ showNote, setShowNote, noteId }) => {

  const dispatch = useDispatch();
  const note = useSelector(state => state.notes[noteId])
   
  console.log('note===================',note)
  
  const [title, setTitle] = useState();   
  const [content, setContent] = useState();
  
  useEffect(() => {
    
  },[dispatch, note])
  if (!note) return null


  const handleChange = async (e) => {
    e.preventDefault();

  };



  return (
    <div>
      <h2>{note.title}</h2>
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
      </div>
    </div>
  );
}



export default NoteUpdater;