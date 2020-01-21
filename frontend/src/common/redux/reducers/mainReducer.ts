import { combineReducers } from "redux";
import { changeTitle } from "./title";
import { recommendationsReducer } from "./recommendations";

export const mainReducer = combineReducers({
  changeTitle: changeTitle,
  recommendations: recommendationsReducer
});
