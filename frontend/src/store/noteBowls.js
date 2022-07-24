

const LOAD = 'notebowls/LOAD';

const load = list => ({
  type: LOAD,
  list
});


//-----------Thunk-Action-Creators-------------------//


export const getNoteBowls = (id) => async dispatch => {
  const res = await fetch(`api/notebowls/${id}`);

  if (res.ok) {
    const list = await res.json();
    dispatch(load(list));
  };
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
    default:
      return state;
  };
};