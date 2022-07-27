import { csrfFetch } from "./csrf";

const LOAD_NOTES = 'notes/LOAD_NOTES';

const loadNotes = (notesList) => ({
  type: LOAD_NOTES,
  notesList
});


//-----------Thunk-Action-Creators-------------------//


export const getNoteBowlNotes = (noteBowlId) => async dispatch => {
  const res = await csrfFetch(`/api/notebowls/${noteBowlId}/notes`);
  
  if (res.ok) {
    const notesList = await res.json();
    console.log('noteslist---------', notesList)
    dispatch(loadNotes(notesList));
  };
};

export const createNote = (payload) => async dispatch => {
  const res = await csrfFetch(`/api/notes/${payload.userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (res.ok) {
    const notes = await res.json();
    console.log('notes---------', notes)
    dispatch(loadNotes(notes));
    return notes;
  }
}



//------------------Reducer--------------------------//


const initialState = {
  notesList: []
};

export default function notesReducer(state = initialState, action) {
  switch(action.type) {
    case LOAD_NOTES:
      const noteBowlsNotes = {};
      console.log('action.list---------', action.notesList)
      action.notesList.forEach(note => {
        noteBowlsNotes[note.id] = note;
      });
      return {
        ...state,
        ...noteBowlsNotes,
        notesList: action.notesList
      };
    default:
      return state;
  };
};