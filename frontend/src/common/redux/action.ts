import { Dispatch } from 'redux'
import { Store } from './store'
const getToken = (w: any) => w['__TOKEN__']

export interface Action {
  type: string
  payload: any
}

export const getAutoCompletition = (input: string) => (
  dispatch: Dispatch,
  getState: () => Store
) => {
  return fetch(`/autocomplete?input=${input}&token=${getToken(window as any)}`)
    .then((v: any) => v.json())
    .then((v: { result: any }) =>
      dispatch({ type: 'DELIVER_AUTOCOMPLETE', payload: v.result })
    )
}
