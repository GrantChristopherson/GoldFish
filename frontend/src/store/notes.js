

const LOAD_NOTES = 'notes/LOAD_NOTES';

const load = (notes, noteBowlId) => ({
  type: LOAD_NOTES,
  notes,
  noteBowlId
});


//-----------Thunk-Action-Creators-------------------//


export const getNoteBowlNotes = (noteBowlId) => async dispatch => {
  const res = await fetch(`api/notebowls/${noteBowlId}`);
  
  if (res.ok) {
    const notesList = await res.json();
    dispatch(load(notesList));
  };
};



//------------------Reducer--------------------------//


const initialState = {
  list: []
};

const sortList = (list) => {
  return list.sort((noteA, noteB) => {
    return noteA.id - noteB.id
  });
};

export default function notesReducer(state = initialState, action) {
  switch(action.type) {
    case LOAD_NOTES:
      const noteBowlsNotes = {};
      action.list.forEach(note => {
        noteBowlsNotes[note.id] = note;
      });
      return {
        ...noteBowlsNotes,
        ...state,
        list: sortList(...noteBowlsNotes)
      }
    default:
      return state;
  };
};