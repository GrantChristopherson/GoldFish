import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';




const NoteUpdater = ({ showNote, setShowNote, noteId }) => {

  const dispatch = useDispatch();
  const note 
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    dispatch()
  },[dispatch,])


  const handleChange = async (e) => {
    e.preventDefault();

  };



  return (
    <div>
      <h2>Note</h2>
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