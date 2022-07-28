import { csrfFetch } from "./csrf";

const LOAD = 'notebowls/LOAD';
const REMOVE_NOTEBOWL = 'notebowls/REMOVE_NOTEBOWL';


const load = list => ({
  type: LOAD,
  list
});

const remove = (id) => ({
  type: REMOVE_NOTEBOWL,
  id
});



//-----------Thunk-Action-Creators-------------------//

export const getNoteBowls = (id) => async dispatch => {
  const res = await csrfFetch(`/api/notebowls/${id}`);
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
    case REMOVE_NOTEBOWL:
        const revisedState = { ...state, list: [ ...state.list] };
        const revisedList = [ ...state.list.filter(
          (noteBowl) => noteBowl.id !== action.id
        )]
        const finalArray = [ ...revisedList ]
        delete revisedState[action.id]
        revisedState.list = finalArray
        return revisedState
    default:
      return state;
  };
};