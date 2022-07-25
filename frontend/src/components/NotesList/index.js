import { useDispatch, useSelector } from 'react-redux';
import { getNoteBowlNotes } from '../../store/notes'



const NotesList = () => {



  return (
    <div className='notes-list'>
      <h2>Notes</h2>
      <ul>
        {/* {NotesList.map(note => {
          <div>
            <li>{note.title}</li>
            <div>
              <button> V </button>
              <button> - </button>
            </div>
          </div>
        })} */}
      </ul>
      <button> + </button>
    </div>
  );
};



export default NotesList;