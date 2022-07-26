import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { newNoteBowl } from '../../store/noteBowls';



const NoteBowlCreator = ({ hideForm }) => {


  const dispatch = useDispatch();
  const sessionUserId = useSelector(state => state.session.user.id);

  const [title, setTitle] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId: sessionUserId,
      title
    };

    let addNoteBowl = await dispatch(newNoteBowl(payload));
    if (addNoteBowl) {
      hideForm();
    };
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    hideForm();
  };



  return (
    <div className='noteBowlCreator-input-box'>
      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder='Title'
          name='title'
        />
        <button type='submit'>Submit</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </div>
  );
};



export default NoteBowlCreator;