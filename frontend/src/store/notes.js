import { csrfFetch } from "./csrf";

const LOAD_NOTES = 'notes/LOAD_NOTES';

const loadNotes = (notes, noteBowlId) => ({
  type: LOAD_NOTES,
  notes,
  noteBowlId
});


//-----------Thunk-Action-Creators-------------------//


export const getNoteBowlNotes = (noteBowlId) => async dispatch => {
  const res = await csrfFetch(`api/notebowls/${noteBowlId}`);
  
  if (res.ok) {
    const notesList = await res.json();
    dispatch(loadNotes(notesList));
  };
};



//------------------Reducer--------------------------//


const initialState = {
  list: []
};

export default function notesReducer(state = initialState, action) {
  switch(action.type) {
    case LOAD_NOTES:
      const noteBowlsNotes = {};
      action.list.forEach(note => {
        noteBowlsNotes[note.id] = note;
      });
      return {
        ...state,
        ...noteBowlsNotes,
        list: action.list
      };
    default:
      return state;
  };
};