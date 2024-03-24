export const initialState = {
  basket: [],
  user: null,
  orderCart: [],
};
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);
let newBasket;
const reducer = (state, action) => {
  switch (action.type) {
    case "REMOVE_FROM_ORDERS":
      const idx = state.orderCart.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      newBasket = [...state.orderCart];
      if (idx >= 0) {
        newBasket.splice(idx, 1);
      } else {
        console.warn(
          "Unexpected error encountered while removing the item from the cart!"
        );
      }
      return {
        ...state,
        orderCart: newBasket,
      };
    case "SET_ORDERS":
      return {
        ...state,
        orderCart: action.item,
      };
    case "EMPTY_ORDER_CART":
      return {
        ...state,
        orderCart: [],
      };
    case "ADD_TO_ORDERS":
      return {
        ...state,
        orderCart: [...action.item, ...state.orderCart],
      };
    case "SET_STATE":
      return {
        ...state,
        basket: action.payload,
      };
    case "ADD_TO_CART":
      newBasket = [...state.basket, action.item];
      return {
        ...state,
        basket: newBasket,
      };
    case "REMOVE_FROM_CART":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          "Unexpected error encountered while removing the item from the cart!"
        );
      }
      return {
        ...state,
        basket: newBasket,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_CART":
      return {
        ...state,
        basket: action.basket,
      };
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };
    default:
      return state;
  }
};

export default reducer;
