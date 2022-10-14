const initialState = {
  products: [],
  productDetail: [],
};
const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        products: payload,
      };
    case "GET_PRODUCT_DETAIL":
      return {
        ...state,
        productDetail: payload,
      };
      case 'ORDER_BY_PRICE':
        const filterByPrice =
          payload === "MayorPrecio"
            ? state.products.sort((a, b) => {
                if (parseInt(a.price) > parseInt(b.price)) return -1;
                if (parseInt(a.price) < parseInt(b.price)) return 1;
                return 0
              })
            : state.products.sort((a, b) => {
                if (parseInt(a.price) < parseInt(b.price)) return -1;
                if (parseInt(a.price) > parseInt(b.price)) return 1;
                return 0
              });
        return {
          ...state,
          products: filterByPrice,
        };

    default:
      return state;
  }
};
export default rootReducer;
