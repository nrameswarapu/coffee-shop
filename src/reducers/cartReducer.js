import { useReducer } from 'react';

const initialCart = [];

export const CartTypes = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  EMPTY: 'EMPTY',
};

const findItem = (cart, itemId) => cart.find((item) => item.id === itemId);
/**
 * Cart reducer
 * @param {*} state  - array of cart items
 * @param {*} action  - selected item
 * @returns state - updated cart item
 */
const CartReducer = (state, action) => {
  switch (action.type) {
    case CartTypes.ADD:
      if (findItem(state, action.itemId)) {
        return state.map((item) => {
          if (item.id === action.itemId) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      }
      return [
        ...state,
        { id: action.itemId, quantity: 1 },
      ];
    case CartTypes.REMOVE: {
      const updateItem = findItem(state, action.itemId);
      if (updateItem.quantity > 1) {
        return state.map((item) => {
          if (item.id === updateItem.id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
      }
      return state.filter((item) => item.id !== action.itemId);
    }
    case CartTypes.EMPTY:
      return [];
    default:
      throw new Error(`Invalid action type ${action.type}`);
  }
};

export const UserCartReducer = () => useReducer(CartReducer, initialCart);
