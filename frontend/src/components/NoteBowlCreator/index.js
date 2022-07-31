// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import { newNoteBowl } from '../../store/noteBowls';



// const NoteBowlCreator = ({ hideForm }) => {


//   const dispatch = useDispatch();
//   const sessionUserId = useSelector(state => state.session.user.id);

//   const [title, setTitle] = useState('');
//   const [errors, setErrors] = useState([]);


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       userId: sessionUserId,
//       title
//     };
//     setErrors([]);
//     let addNoteBowl = dispatch(newNoteBowl(payload)) 
//       .catch(
//         async (res) => {
//           const data = await res.json();
//           if (data && data.errors) setErrors(data.errors);
//         }
//       );
//     }
//     if (addNoteBowl) {
//       hideForm();
//     }
//   };
    


//   const handleCancelClick = (e) => {
//     e.preventDefault();
//     hideForm();
//   };
  
  

//   return (
//     <div className='noteBowlCreator-input-box'>
//       <form className="noteBowlForm" onSubmit={handleSubmit}>
//         <ul>
//           {errors.map((error, idx) => <li key={idx}>{error}</li>)}
//         </ul>
//           <input 
//             type='text'
//             onChange={(e) => setTitle(e.target.value)}
//             value={title}
//             placeholder='Title'
//             name='title'
//             required
//           />
//           <button type='submit'>Submit</button>
//           <button type="button" onClick={handleCancelClick}>Cancel</button>
//       </form>
//     </div>
//   ); 
// // }




// export default NoteBowlCreator;