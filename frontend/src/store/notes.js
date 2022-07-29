import { csrfFetch } from "./csrf";

const LOAD_NOTES = 'notes/LOAD_NOTES';
const REMOVE_NOTE = 'notes/REMOVE_NOTE';

const loadNotes = (notesList) => ({
  type: LOAD_NOTES,
  notesList
});

const removeNote = (id) => ({
  type: REMOVE_NOTE,
  id
})


//-----------Thunk-Action-Creators-------------------//


export const getNoteBowlNotes = (noteBowlId) => async dispatch => {
  const res = await csrfFetch(`/api/notebowls/${noteBowlId}/notes`);
  if (res.ok) {
    const notesList = await res.json();
    dispatch(loadNotes(notesList));
  };
};

// export const getNote = (id) => async dispatch => {
//   const res = await csrfFetch(`/api/notes/${id}`);
//   if (res.ok) {
//     const note = await res.json();
//     dispatch(loadNotes(note))
//   }
// }

export const createNote = (payload) => async dispatch => {
  const res = await csrfFetch(`/api/notes/${payload.userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (res.ok) {
    const notesList = await res.json();
    dispatch(loadNotes(notesList));
    return notesList;
  }
}

export const updateNote = (payload) => async dispatch => {
  const res = await csrfFetch(`/api/notes/${payload.id}`, {
    method: 'P',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (res.ok) {
    const notesList = await res.json();
    dispatch(loadNotes(notesList));
    return notesList;
  }
}

export const deleteNote = (id) => async dispatch => {
  const res = await csrfFetch(`/api/notes/${id}`, {
    method: 'delete'
  });
  if (res.ok) {
    dispatch(removeNote(id))
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
      action.notesList.forEach(note => {
        noteBowlsNotes[note.id] = note;
      });
      return {
        ...state,
        ...noteBowlsNotes,
        notesList: action.notesList
      };
    case REMOVE_NOTE:
      const newState = { ...state, notesList: [ ...state.notesList] };
      const newList = [ ...state.notesList.filter(
        (note) => note.id !== action.id
      )]
      const editedArray = [ ...newList ]
      delete newState[action.id]
      newState.notesList = editedArray
      return newState
    default:
      return state;
  };
};