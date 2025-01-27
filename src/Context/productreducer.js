const ProductReducer = (state, action) => {
  console.log("Action Received: ", action);
  switch (action.type) {
    case "API_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    case "SET_API_DATA":
      const featData = action.payload.filter((currele) => currele.featured === true);
      return {
        ...state,
        isLoading: false,
        products: action.payload,
        featuredProducts: featData,
      };

    case "API_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((product) => product._id !== action.payload),
      };

    case "SINGLE_PRODUCT_LOADING":
      return {
        ...state,
        isSingleLoading: true,
      };

    case "SET_SINGLE_DATA":
      return {
        ...state,
        isSingleLoading: false,
        singleproduct: action.payload,
      };

    case "SINGLE_PRODUCT_ERROR":
      return {
        ...state,
        isSingleLoading: false,
        isError: true,
      };

    case "CURR_LOADING":
      return {
        ...state,
        isCurrloading: true,
      };

    case "SET_CURR_USER":
      return {
        ...state,
        isCurrloading: false,
        user: action.payload,
      };

    case "CURR_ERROR":
      return {
        ...state,
        isCurrloading: false,
        isError: true,
      };

    default:
      return state;
  }
};

export default ProductReducer;
