import { Action, Reducer } from 'redux'

export interface ReduxAction extends Action {
  payload: any
}
export interface HomeStore {
  autocompletition: any
  recommendations: any
}
export const homeReducer: Reducer<any> = (
  state = {} as HomeStore,
  action: ReduxAction
) => {
  switch (action.type) {
    case 'DELIVER_AUTOCOMPLETE': {
      return { ...state, autocompletition: action.payload }
    }
    default:
      return state
  }
}
