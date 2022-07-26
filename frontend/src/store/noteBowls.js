import { csrfFetch } from "./csrf";

const LOAD = 'notebowls/LOAD';
const ADD_NOTEBOWL = 'notebowls/ADD_NOTEBOWL';
const REMOVE_NOTEBOWL = 'notebowls/REMOVE_NOTEBOWL';


const load = list => ({
  type: LOAD,
  list
});

// const addNoteBowl = noteBowl => ({
//   type: ADD_NOTEBOWL,
//   noteBowl
// })

const remove = (userId, id) => ({
  type: REMOVE_NOTEBOWL,
  userId,
  id
});



//-----------Thunk-Action-Creators-------------------//

export const getNoteBowls = (id) => async dispatch => {
  const res = await fetch(`api/notebowls/${id}`);
  if (res.ok) {
    const list = await res.json();
    dispatch(load(list));
  };
};


export const newNoteBowl = (payload) => async dispatch => {
  const res = await csrfFetch(`/api/notebowls/${payload.userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (res.ok) {
    const noteBowls = await res.json();
    dispatch(load(noteBowls));
    return noteBowls;
  }
};


export const deleteNoteBowl = (id) => async dispatch => {
  const res = await csrfFetch(`/api/notebowls/${id}`, {
    method: 'delete'
  });
  if (res.ok) {
    const id= await res.json();
    dispatch(remove(id));
  };
};



//------------------Reducer--------------------------//

const initialState = {
  list: []
};

export default function noteBowlReducer(state = initialState, action) {
  switch(action.type) {
    case LOAD:
      const allUsersNoteBowls = {};
      action.list.forEach(noteBowl => {
        allUsersNoteBowls[noteBowl.id] = noteBowl;
      });
      return {
        ...state,
        ...allUsersNoteBowls,
        list: action.list
      };
    case ADD_NOTEBOWL:
        const newState = {
          ...state,
          [action.noteBowl.id]: action.noteBowl
        };
        const newList = [action.noteBowl, ...state.list]
        newState.list = newList
        return newState
    case REMOVE_NOTEBOWL:
        const revisedState = { ...state };
        const revisedList = [ ...state.list.filter(
          (noteBowlId) => noteBowlId !== action.noteBowl.id
        )]
        revisedState.list = revisedList
        return revisedState
    default:
      return state;
  };
};