import { ADD_ITEM, GET_ITEMS  } from '../Types/Type';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const buyerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      return {
        ...state,
        items: existingItemIndex !== -1
          ? state.items.map((item, index) =>
              index === existingItemIndex ? action.payload : item
            ) // Update existing item
          : [...state.items, action.payload], // Add new item
        loading: false,
      };

    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false,
        error: null, // Clear any previous errors
      };

    default:
      return state;
  }
};

export default buyerReducer;
