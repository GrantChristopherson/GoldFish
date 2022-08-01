import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { newNoteBowl } from '../../store/noteBowls'



const NoteBowlCreator = ({ hideForm }) => {


  const dispatch = useDispatch();
  const sessionUserId = useSelector(state => state.session.user.id);
  const listChecker = useSelector(state => state.noteBowls.list)

  const [title, setTitle] = useState('');
  const [isDefault, setIsDefault] = useState(false)
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId: sessionUserId,
      title,
      default: isDefault
    };
    setErrors([]);
    let err = []
    if (!title.length || title.length > 30) setErrors('Title must be between 1 and 30 characters');
    setErrors([...err])
    if (!errors.length) {
      hideForm()
      return dispatch(newNoteBowl(payload)) 
    } else {
        return errors
    }
  }
        
  const handleCancelClick = (e) => {
    e.preventDefault();
    hideForm();
  };
  
  

  return (
    <div className='noteBowlCreator-input-box'>
      <form className="noteBowlForm" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
          <input 
            type='text'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder='Title'
            name='title'
            required
          />
          <button type='submit'>Submit</button>
          <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </div>
  ); 
}




export default NoteBowlCreator;