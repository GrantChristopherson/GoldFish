import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { newNoteBowl } from '../../store/noteBowls';



const NoteBowlCreator = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUserId = useSelector(state => state.session.user.id);

  const [title, setTitle] = useState('');
  const [showNoteBowlForm, setShowNoteBowlForm] = useState(false);


  const hideForm =() => setShowNoteBowlForm(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId: sessionUserId,
      title
    };

    let addNoteBowl = await dispatch(newNoteBowl(payload));
    if (addNoteBowl) {
      // history.push(`/home`);
      hideForm();
    }
  }

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