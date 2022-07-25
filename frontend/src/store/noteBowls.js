

const LOAD = 'notebowls/LOAD';
const ADD_NOTEBOWL = 'notebowls/ADD_NOTEBOWL';



const load = list => ({
  type: LOAD,
  list
});

const addNoteBowl = noteBowl => ({
  type: ADD_NOTEBOWL,
  noteBowl
})



//-----------Thunk-Action-Creators-------------------//

export const getNoteBowls = (id) => async dispatch => {
  const res = await fetch(`api/notebowls/${id}`);

  if (res.ok) {
    const list = await res.json();
    dispatch(load(list));
  };
};


export const newNoteBowl = (payload) => async dispatch => {
  const res = await fetch(`/api/notebowls/${payload.userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (res.ok) {
    const noteBowl = await res.json();
    dispatch(addNoteBowl(noteBowl));
    return noteBowl;
  }
};



//------------------Reducer--------------------------//

const initialState = {
  list: []
};

const sortList = (list) => {
  return list.sort((noteBowlA, noteBowlB) => {
    return noteBowlA.id - noteBowlB.id
  });
};



export default function noteBowlReducer(state = initialState, action) {
  switch(action.type) {
    case LOAD:
      const allUsersNoteBowls = {};
      action.list.forEach(noteBowl => {
        allUsersNoteBowls[noteBowl.id] = noteBowl;
      });
      return {
        ...allUsersNoteBowls,
        ...state,
        list: sortList(action.list)
      };
    case ADD_NOTEBOWL:
      if (!state[action.noteBowls.id]) {
        const newState = {
          ...state,
          [action.noteBowls.id]: action.noteBowls
        };
        const noteBowlList = newState.list.map(noteBowl => newState[noteBowl]);
        noteBowlList.push(action.noteBowls);
        newState.list = sortList(noteBowlList);
        return newState;
      };
      return {
        ...state,
        [action.noteBowls.id]: {
          ...state[action.noteBowls.id],
          ...action.noteBowls
        }
      };
    default:
      return state;
  };
};