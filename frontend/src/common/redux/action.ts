import { Dispatch } from "redux";

export interface Action {
  type: string;
  payload: any;
}

export const changeTitle = (newTitle: string): Action => ({
  type: "CHANGE_TITLE",
  payload: newTitle
});
