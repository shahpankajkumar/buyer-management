import axios from 'axios';
import { ADD_ITEM, GET_ITEMS, UPDATE_ITEM } from '../Types/Type';
import { toast } from '../../utils/constant';

const URL = 'http://localhost:5000/buyers';

// Action to add a buyer
export const addBuyers = (data) => async (dispatch) => {
  try {
    const response = await axios.post(URL, data);

    if (response.status === 201) {
      dispatch({ type: ADD_ITEM, payload: response.data });
      toast(response.statusText, "success");
    } else {
      toast("Failed to add buyer", "error");
    }
  } catch (error) {
    console.error("Error adding buyer:", error);

    if (error.response) {
      toast(error.response.data.message || "Error occurred", "error");
    } else {
      toast("Network error", "error");
    }
  }
};

export const getBuyers = () => async (dispatch) => {

  try {
    const response = await axios.get(URL);

    if (response.status === 200) {
      
      // Accessing the data property from the response
      dispatch({ type: GET_ITEMS, payload: response.data }); 
    } else {
      toast("Failed to fetch buyers", "error");
      dispatch({ type: GET_ITEMS, payload: [] });
    }
  } catch (error) {
    console.error("Error fetching buyers:", error);

    if (error.response) {
      toast(error.response.data.message || "Error occurred while fetching data", "error");
    } else {
      toast("Network error", "error");
    }
    // Ensuring state consistency in case of error
    dispatch({ type: GET_ITEMS, payload: [] });
  }
};

export const updateBuyers = (id, data) => async (dispatch) => {
  try {
    const response = await axios.put(`${URL}/${id}`, data);

    if (response.status === 200) {
      dispatch({ type: UPDATE_ITEM, payload: response.data });
      toast(response.statusText, "success");
    } else {
      toast("Failed to update buyer", "error");
    }
  } catch (error) {
    console.error("Error updating buyer:", error);

    if (error.response) {
      toast(error.response.data.message || "Error occurred", "error");
    } else {
      toast("Network error", "error");
    }
  }
};

