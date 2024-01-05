export const LOAD_ITEMS = "items/LOAD_ITEMS";
export const UPDATE_ITEM = "items/UPDATE_ITEM";
export const REMOVE_ITEM = "items/REMOVE_ITEM";
export const ADD_ITEM = "items/ADD_ITEM";

const load = (items, pokemonId) => ({
  type: LOAD_ITEMS,
  items,
  pokemonId
});

const update = (item) => ({
  type: UPDATE_ITEM,
  item
});

const add = (item) => ({
  type: ADD_ITEM,
  item
});

const remove = (itemId, pokemonId) => ({
  type: REMOVE_ITEM,
  itemId,
  pokemonId
});

const initialState = {};

export const getItems = (pokemonId) => async dispatch => {
  // debugger
  const response = await fetch(`/api/pokemon/${pokemonId}/items`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list, pokemonId));
  }
};

export const editItem = (item) => async dispatch => {
  const response = await fetch(`/api/items/${item.id}/`, {
    method: 'PATCH',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  if (response.ok) {
    const newItem = await response.json();
    dispatch(update(newItem));
  }
};

// export const createPokemon = (pokemon) => async dispatch => {
//   const response = await fetch(`/api/pokemon`, { 
//     method: 'POST',
//     body: JSON.stringify(pokemon),
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json' 
//     }
//   });

//   if (response.ok) {
//     const newPokemon = await response.json();
//     dispatch(addOnePokemon(newPokemon));
//   }
// };

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ITEMS: {
      const newItems = {};
      action.items.forEach(item => {
        newItems[item.id] = item;
      })
      return {
        ...state,
        ...newItems
      }
    }
    case REMOVE_ITEM: {
      const newState = { ...state };
      delete newState[action.itemId];
      return newState;
    }
    case ADD_ITEM:
    case UPDATE_ITEM: 
      return {
        ...state,
        [action.item.id]: action.item
      };
    default:
      return state;
  }
};

export default itemsReducer;
