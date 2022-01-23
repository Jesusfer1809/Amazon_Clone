import { combineReducers } from "redux";
import { postReducer } from "./postReducer";
import { itemsReducer } from "./itemsReducer";

export default combineReducers({
  post: postReducer,
  items: itemsReducer,
});
