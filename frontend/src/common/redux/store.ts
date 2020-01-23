import { HomeStore } from './reducers/home'

export type Store = {
  home: HomeStore
  token?: string
}
