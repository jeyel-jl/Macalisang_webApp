import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import reducer from './productreducer';

const Appcontext = createContext();

const API = "http://localhost:3000/api/product/get-user-all-product";
const GetUserApi = "http://localhost:3000/api/curr/get-curr-user";

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featuredProducts: [],
  isSingleLoading: false,
  singleproduct: {},
  isCurrloading: false,
  user: {},
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Helper function to get the token
  const getToken = () => localStorage.getItem("x-auth-token");

  const getProduct = async (url) => {
    dispatch({ type: "API_LOADING" });
    try {
      const response = await axios.get(url, {
        headers: { 'x-auth-token': getToken() },
      });
      const value = await response.data;
      dispatch({ type: "SET_API_DATA", payload: value });
    } catch (error) {
      console.log(error);
      dispatch({ type: "API_ERROR" });
    }
  };

  const currUser = async () => {
    dispatch({ type: "CURR_LOADING" });
    try {
      const response = await axios.get(GetUserApi, {
        headers: { 'x-auth-token': getToken() },
      });
      dispatch({ type: "SET_CURR_USER", payload: response.data });
    } catch (e) {
      console.log(e.response?.data || e.message); // Handle error safely
      dispatch({ type: "CURR_ERROR" });
    }
  };

  const getSingleProduct = async (id) => {
    dispatch({ type: "SINGLE_PRODUCT_LOADING" });
    try {
      const response = await axios.get(`http://localhost:3000/api/product/${id}`);
      const singleData = await response.data;
      dispatch({ type: "SET_SINGLE_DATA", payload: singleData });
    } catch (error) {
      dispatch({ type: "SINGLE_PRODUCT_ERROR" });
    }
  };

  useEffect(() => {
    getProduct(API); // Get products on initial load
    currUser(); // Optionally fetch current user when the app loads
  }, []);

  return (
    <Appcontext.Provider value={{ ...state, getSingleProduct, currUser }}>
      {children}
    </Appcontext.Provider>
  );
};

export { AppProvider, Appcontext };
