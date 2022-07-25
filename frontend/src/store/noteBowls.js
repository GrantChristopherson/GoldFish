import { csrfFetch } from "./csrf";

const LOAD = 'notebowls/LOAD';
const ADD_NOTEBOWL = 'notebowls/ADD_NOTEBOWL';



const load = list => ({
  type: LOAD,
  list
});

// const addNoteBowl = noteBowl => ({
//   type: ADD_NOTEBOWL,
//   noteBowl
// })



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



//------------------Reducer--------------------------//

const initialState = {
  list: []
};

// const sortList = (list) => {
//   return list.sort((noteBowlA, noteBowlB) => {
//     return noteBowlA.id - noteBowlB.id
//   });
// };



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
    default:
      return state;
  };
};